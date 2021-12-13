using Microsoft.EntityFrameworkCore;
using RUG.WebEng.Movies.Models;

namespace RUG.WebEng.Movies.Repositories;

public class LanguageRepository : IRepository<Language, int>
{
    // As everywhere, the actual database connection (DatabaseContext) is provided
    // through Dependency Injection in the constructor by the framework. Nowhere
    // in the app code do we make an explicit decision on how to obtain such an
    // instance, except for Program.cs.
    protected DatabaseContext _context;

    public LanguageRepository(DatabaseContext context)
    {
        _context = context;
    }

    // Here is some C# magic: a Property is like a normal class field, but with
    // automatically-generated getters and setters (this { get; set; }-notation)
    // This specifically is a property with just a getter that is shortened to
    // this form like a mini-lambda function.
    public IQueryable<Language> SimpleCollection => _context.Languages;
    public IQueryable<Language> FullCollection => _context.Languages.Include(l => l.Movies);

    public async Task<bool> CreateAsync(Language language)
    {
        // Check whether name already exists
        if(await _context.Languages.AnyAsync(l => l.Name == language.Name))
            return false;

        // Otherwise, create new entry
        _context.Languages.Add(language);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task DeleteAsync(Language language)
    {
        _context.Languages.Remove(language);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> UpdateAsync(Language language)
    {
        _context.Update(language);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<Language?> FindAsync(int id) => await FullCollection.FirstOrDefaultAsync(l => l.Id == id);
}