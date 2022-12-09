namespace RUG.WebEng.Movies.Repositories;

// This repository interface serves as an abstraction of a repository of
// objects in some storage system. This way, the application can operate
// on a set of objects (model instances) without being aware of the actual
// implementation of the storage - this could be a normal database, or
// it could be implemented as calls to some third-party API.
//
// This allows for cleaner separation of concerns and would theoretically
// allow us to change storage systems for e.g. all Movies just by changing
// the implementation of this one interface.
public interface IRepository<T, TKey> where T : class
{
    public Task<bool> CreateAsync(T item);
    public Task DeleteAsync(T item);
    public Task<bool> UpdateAsync(T item);
    public Task<T?> FindAsync(TKey key);

    // The difference between a simple and full collection is that the first
    // does not contain "reference entities", those pointed to by a linking
    // table. In the case of movies; the simple collection does not contain
    // languages and actors, but the full one does.
    // 
    // This is one place where the abstraction is "leaky" (as developers call
    // it), where we use our repository differently based on an implementation
    // detail of the particular database we're using. We could circumvent this
    // by providing more/different "FindXXX" functions that would cover all our
    // usecases, e.g. "FindMoviesByActor" or more general "FindByColumn". In this
    // case, I decided against that to limit the amount of boilerplate code.
    public IQueryable<T> SimpleCollection { get; }
    public IQueryable<T> FullCollection { get; }
}
