using Microsoft.AspNetCore.Mvc.ModelBinding;
using Swashbuckle.AspNetCore.Annotations;

namespace RUG.WebEng.Movies.ApiModels;

public class MovieSummary
{
    [BindNever]
    [SwaggerSchema(ReadOnly = true)]
    public int Id { get; set; }
    public string Title { get; set; }
    public int? Year { get; set; }
    public string? Rating { get; set; }

    public static MovieSummary FromDatabase(Models.Movie movie) =>
        new()
        {
            Id = movie.Id,
            Title = movie.Title,
            Year = movie.Year,
            Rating = movie.Rating
        };
}