using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace RUG.WebEng.Movies.Controllers;

// I typically create an "AbstractController" abstract class that serves
// as a common source for all controllers that does some shared functionality.
//
// In this case, it just holds a shared feature to easily enable paging on
// a listing in the API.
public abstract class AbstractController : ControllerBase
{
    public class Models
    {
        // I define a generic interface describing some kind of "querying"
        // operation on a type. This is used for e.g. filtering, sorting,
        // and paging on various API pages.
        //
        // This is another place where the abstraction of storage into repositories
        // breaks down, as we assume our list of items to be a "queryable" which
        // is relatively database-specific. Ideally, we extend our repositories
        // with features to query the data like this, and then convert the API
        // requests into those repository-queries that will then be converted to
        // IQueryable operations. However, that is too cumbersome for such a small
        // project.
        public interface IApiQuery<T>
        {
            public IQueryable<T> Apply(IQueryable<T> items);

            // Function to apply some collection of queries in order.
            public static IQueryable<T> ApplyAll(IQueryable<T> items, params IApiQuery<T>[] queries) =>
                queries.Aggregate(items, (items, query) => query.Apply(items));
        }

        // This is a query implementation supporting paging
        public class Paging<T> : IApiQuery<T>
        {
            [BindRequired]
            [Range(1, 100)]
            public int Limit { get; set; }
            public int Offset { get; set; } = 0;

            public IQueryable<T> Apply(IQueryable<T> items) => items.Skip(Offset).Take(Limit);
        }
    }
}