using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RUG.WebEng.Movies.Models;
using RUG.WebEng.Movies.Repositories;

namespace RUG.WebEng.Movies.Controllers;

[ApiController]
[Route("[controller]")]
public class ActorsController : AbstractController
{
    private readonly ActorRepository _actors;

    public ActorsController(ActorRepository actors)
    {
        _actors = actors;
    }

    [HttpGet]
    public ActionResult<IAsyncEnumerable<ApiModels.ActorSummary>> GetListAsync(
        [FromQuery] Models.Paging<Actor> paging // we support just paging
    )
    {
        // We check that the query provided is valid
        if(!ModelState.IsValid)
            return BadRequest();

        var actors = _actors.SimpleCollection;
        actors = paging.Apply(actors);

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
        return Ok(actors
                    .AsAsyncEnumerable()
                    .Select(ApiModels.ActorSummary.FromDatabase)
                );
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ApiModels.Actor>> GetActorAsync(int id) =>
        // Another bit of C# syntactic sugar, *switch expressions*. Basically
        // we obtain the actor from the repository and do a Haskell-style pattern
        // match on it: if it is null we return, if it is something else we bind
        // it to the variable actor and convert that into the respective ApiModel.
        await _actors.FindAsync(id) switch
        {
            null => NotFound(),
            var actor => Ok(ApiModels.Actor.FromDatabase(actor))
        };

    [HttpGet("{id}/movies")]
    public async Task<ActionResult<IEnumerable<ApiModels.MovieSummary>>> GetActorMoviesAsync(int id) =>
        // Another bit of C# syntactic sugar, *switch expressions*. Basically
        // we obtain the actor from the repository and do a Haskell-style pattern
        // match on it: if it is null we return, if it is something else we bind
        // it to the variable actor and convert that into the respective ApiModel.
        await _actors.FindAsync(id) switch
        {
            null => NotFound(),
            var actor => Ok(actor.Movies.Select(ApiModels.MovieSummary.FromDatabase))
        };
}