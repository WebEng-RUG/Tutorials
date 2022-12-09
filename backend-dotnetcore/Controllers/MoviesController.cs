using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RUG.WebEng.Movies.Models;
using RUG.WebEng.Movies.Repositories;

namespace RUG.WebEng.Movies.Controllers;

[ApiController] // denotes this class is an API controller
[Route("[controller]")] // denotes the route prefix of this controller to be /movies
public class MoviesController : AbstractController
{
    // As everywhere, the actual repositories are provided through Dependency Injection 
    // in the constructor by the framework. Nowhere in the app code do we make an explicit
    // decision on how to obtain such an instance, except for Program.cs.
    private readonly MovieRepository _movies;
    private readonly ActorRepository _actors;
    private readonly LanguageRepository _languages;

    // Constructor for dependency injection
    public MoviesController(
        MovieRepository movies,
        ActorRepository actors,
        LanguageRepository languages
    )
    {
        _movies = movies;
        _actors = actors;
        _languages = languages;
    }

    [HttpGet]
    public ActionResult<IAsyncEnumerable<ApiModels.MovieSummary>> GetListAsync(
        [FromQuery] RequestModels.Order order, // we support sorting,
        [FromQuery] Models.Paging<Movie> paging, // paging,
        [FromQuery] RequestModels.Filter filter // and filtering
    )
    {
        // We check that the queries provided are all valid
        if (!ModelState.IsValid)
            return BadRequest();

        // Then we apply the queries in proper order on our movies set.
        var movies = Models.IApiQuery<Movie>.ApplyAll(_movies.SimpleCollection, filter, order, paging);

        // Here we do some async magic.
        // Typically, you would asynchronously get all results from the database,
        // then convert them, and then return them to the framework, so this function
        // would itself be async.
        //
        // However, since C#9, we have support for async enumerables. That means that
        // we can take the DB query and convert it into an async enumerable, which
        // in practice allows us to start processing the entities while new results
        // are coming in, in sort-of a stream/pipeline fashion! We pass this list
        // to the framework and it will incrementally wait for the next item to arrive
        // before converting it.
        return Ok(movies
                    .AsAsyncEnumerable()
                    .Select(ApiModels.MovieSummary.FromDatabase)
                );
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateAsync([FromBody] ApiModels.Movie apiMovie)
    {
        // We check that the provided Movie is valid
        if (!ModelState.IsValid)
            return BadRequest();

        // We convert the Api Model to an internal model
        var movie = new Movie
        {
            Title = apiMovie.Title,
            Description = apiMovie.Description,
            IMDbUrl = apiMovie.IMDbUrl,
            Year = apiMovie.Year,
            Rating = apiMovie.Rating,
            Review = new Review
            {
                MetaScore = apiMovie.Review.MetaScore,
                UserCount = apiMovie.Review.UserCount,
                UserScore = apiMovie.Review.User
            },

            // Find the actors and languages - we do not create new actors and languages
            // to keep the code a bit simpler.
            Actors = await _actors.SimpleCollection
                .Where(a => apiMovie.Actors.Select(s => s.Name).Contains(a.Name)).ToListAsync(),

            Languages = await _languages.SimpleCollection
                .Where(a => apiMovie.Languages.Contains(a.Name)).ToListAsync()
        };

        // We pass it to the repository
        var result = await _movies.CreateAsync(movie);
        if (!result)
            return Conflict();

        return Ok(movie.Id);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiModels.Movie>> GetMovieAsync(int id) =>
        // Another bit of C# syntactic sugar, *switch expressions*. Basically
        // we obtain the movie from the repository and do a Haskell-style pattern
        // match on it: if it is null we return, if it is something else we bind
        // it to the variable movie and convert that into the respective ApiModel.
        await _movies.FindAsync(id) switch
        {
            null => NotFound(),
            var movie => Ok(ApiModels.Movie.FromDatabase(movie))
        };

    [HttpPut("{id}")]
    public async Task<ActionResult<ApiModels.Movie>> UpdateMovieAsync(int id, [FromBody] ApiModels.Movie apiMovie)
    {
        // We verify that the provided movie is valid
        if (!ModelState.IsValid)
            return BadRequest();

        // We find the existing movie ...
        var movie = await _movies.FindAsync(id);
        if (movie == null)
            return NotFound();

        // ... and update it
        movie.Title = apiMovie.Title;
        movie.Description = apiMovie.Description;
        movie.IMDbUrl = apiMovie.IMDbUrl;
        movie.Year = apiMovie.Year;
        movie.Rating = apiMovie.Rating;
        movie.Review.MetaScore = apiMovie.Review.MetaScore;
        movie.Review.UserCount = apiMovie.Review.UserCount;
        movie.Review.UserScore = apiMovie.Review.User;

        movie.Actors = await _actors.SimpleCollection
            .Where(a => apiMovie.Actors.Select(s => s.Name).Contains(a.Name)).ToListAsync();

        movie.Languages = await _languages.SimpleCollection
            .Where(a => apiMovie.Languages.Contains(a.Name)).ToListAsync();

        await _movies.UpdateAsync(movie);
        return ApiModels.Movie.FromDatabase(movie);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMovieAsync(int id) =>
        // Another bit of C# syntactic sugar, *switch expressions*. Basically
        // we obtain the movie from the repository and do a Haskell-style pattern
        // match on it: if it is null we return, if it is something else we bind
        // it to the variable movie and continue to delete it.
        await _movies.FindAsync(id) switch
        {
            null => NotFound(),
            // The ContinueWith function allows us to chain async operations; it will
            // call Ok() once the deletion has finished and the result of that Ok() will
            // be returned from the await statement.
            var movie => await _movies.DeleteAsync(movie).ContinueWith(_ => Ok())
        };

    public class RequestModels
    {
        // Implementations of queries for sorting and filtering, specifically
        // for movies.
        public class Order : Models.IApiQuery<Movie>
        {
            [BindProperty(Name = "order-by")] // we indicate this is the name to find in the URL
            public Column? By { get; set; }
            [BindProperty(Name = "order-dir")]
            public Dir? Direction { get; set; }

            public enum Dir { Asc, Desc }
            public enum Column { Title, Year, Rating }

            public IQueryable<Movie> Apply(IQueryable<Movie> movies) =>
                // Another bit of C# syntactic sugar, *switch expressions*. Basically
                // we do a Haskell-style pattern match on the pair of variables By and 
                // Direction. For every non-null case we define a behaviour, otherwise
                // we do nothing and return the movies.
                (By, Direction) switch
                {
                    (Column.Title, Dir.Asc) => movies.OrderBy(m => m.Title),
                    (Column.Title, Dir.Desc) => movies.OrderByDescending(m => m.Title),
                    (Column.Year, Dir.Asc) => movies.OrderBy(m => m.Year),
                    (Column.Year, Dir.Desc) => movies.OrderByDescending(m => m.Year),
                    (Column.Rating, Dir.Asc) => movies.OrderBy(m => m.Rating),
                    (Column.Rating, Dir.Desc) => movies.OrderByDescending(m => m.Rating),
                    _ => movies,
                };
        }

        public class Filter : Models.IApiQuery<Movie>
        {
            public string? Title { get; set; }
            public int? Year { get; set; }

            public IQueryable<Movie> Apply(IQueryable<Movie> movies)
            {
                if (Title != null) movies = movies.Where(m => m.Title == Title);
                if (Year != null) movies = movies.Where(m => m.Year == Year);
                return movies;
            }
        }
    }
}
