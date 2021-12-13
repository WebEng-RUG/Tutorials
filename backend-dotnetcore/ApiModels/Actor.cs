using Microsoft.AspNetCore.Mvc.ModelBinding;
using Swashbuckle.AspNetCore.Annotations;

namespace RUG.WebEng.Movies.ApiModels;

public class Actor
{
    [BindNever]
    [SwaggerSchema(ReadOnly = true)]
    public int Id { get; init; }
    public string Name { get; set; }
    public List<MovieSummary> Movies { get; set; } = new();

    public static Actor FromDatabase(Models.Actor actor) =>
        new()
        {
            Id = actor.Id,
            Name = actor.Name,
            Movies = actor.Movies.Select(MovieSummary.FromDatabase).ToList()
        };
}