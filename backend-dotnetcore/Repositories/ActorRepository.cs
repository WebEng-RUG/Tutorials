using Microsoft.EntityFrameworkCore;
using RUG.WebEng.Movies.Models;

namespace RUG.WebEng.Movies.Repositories;

public class ActorRepository : IRepository<Actor, int>
{
    // As everywhere, the actual database connection (DatabaseContext) is provided
    // through Dependency Injection in the constructor by the framework. Nowhere
    // in the app code do we make an explicit decision on how to obtain such an
    // instance, except for Program.cs.
    protected DatabaseContext _context;

    public ActorRepository(DatabaseContext context)
    {
        _context = context;
    }

    // Here is some C# magic: a Property is like a normal class field, but with
    // automatically-generated getters and setters (this { get; set; }-notation)
    // This specifically is a property with just a getter that is shortened to
    // this form like a mini-lambda function.
    public IQueryable<Actor> SimpleCollection => _context.Actors;
    public IQueryable<Actor> FullCollection => _context.Actors.Include(a => a.Movies);

    public async Task<bool> CreateAsync(Actor actor)
    {
        // Check whether name already exists
        if(await _context.Actors.AnyAsync(a => a.Name == actor.Name))
            return false;

        // Otherwise, create new entry
        _context.Actors.Add(actor);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task DeleteAsync(Actor actor)
    {
        _context.Actors.Remove(actor);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> UpdateAsync(Actor actor)
    {
        _context.Update(actor); // This call will make sure the provided actor
                                // is "known" by EF
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Actor?> FindAsync(int id) => await FullCollection.FirstOrDefaultAsync(a => a.Id == id);
}