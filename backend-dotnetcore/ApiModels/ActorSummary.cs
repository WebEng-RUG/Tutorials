using Microsoft.AspNetCore.Mvc.ModelBinding;
using Swashbuckle.AspNetCore.Annotations;

namespace RUG.WebEng.Movies.ApiModels;

public class ActorSummary
{
    [BindNever]
    [SwaggerSchema(ReadOnly = true)]
    public int Id { get; set; }
    public string Name { get; set; }

    public static ActorSummary FromDatabase(Models.Actor actor) =>
        new()
        {
            Id = actor.Id,
            Name = actor.Name
        };
}