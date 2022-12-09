using Microsoft.EntityFrameworkCore;
using RUG.WebEng.Movies.Models;

namespace RUG.WebEng.Movies.Repositories;

public class MovieRepository : IRepository<Movie, int>
{
    // As everywhere, the actual database connection (DatabaseContext) is provided
    // through Dependency Injection in the constructor by the framework. Nowhere
    // in the app code do we make an explicit decision on how to obtain such an
    // instance, except for Program.cs.
    protected DatabaseContext _context;

    public MovieRepository(DatabaseContext context)
    {
        _context = context;
    }

    // Here is some C# magic: a Property is like a normal class field, but with
    // automatically-generated getters and setters (this { get; set; }-notation)
    // This specifically is a property with just a getter that is shortened to
    // this form like a mini-lambda function.
    public IQueryable<Movie> SimpleCollection => _context.Movies;
    public IQueryable<Movie> FullCollection => _context.Movies.Include(m => m.Actors).Include(m => m.Languages);

    public async Task<bool> CreateAsync(Movie movie)
    {
        // Check whether IMDb URL or title already exist
        if (await _context.Movies.AnyAsync(m => m.IMDbUrl == movie.IMDbUrl || m.Title == movie.Title))
            return false;

        // Otherwise, create new entry
        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task DeleteAsync(Movie movie)
    {
        _context.Movies.Remove(movie);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> UpdateAsync(Movie movie)
    {
        _context.Update(movie);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Movie?> FindAsync(int id) => await FullCollection.FirstOrDefaultAsync(m => m.Id == id);
}