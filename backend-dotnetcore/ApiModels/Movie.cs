using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Swashbuckle.AspNetCore.Annotations;

namespace RUG.WebEng.Movies.ApiModels;

public class Movie
{
    [BindNever]
    [SwaggerSchema(ReadOnly = true)]
    public int Id { get; init; }
    [BindRequired]
    public string Title { get; set; }
    public string? Description { get; set; }
    public int? Year { get; set; }
    public string? Rating { get; set; }
    public ReviewSummary Review { get; set; } = new();
    public List<string> Languages { get; set; } = new();
    public List<ActorSummary> Actors { get; set; } = new();
    [BindRequired]
    public string IMDbUrl { get; set; }

    public static Movie FromDatabase(Models.Movie movie) =>
        new()
        {
            Id = movie.Id,
            Title = movie.Title,
            Description = movie.Description,
            Year = movie.Year,
            Rating = movie.Rating,
            Languages = movie.Languages.Select(l => l.Name).ToList(),
            Actors = movie.Actors.Select(ActorSummary.FromDatabase).ToList(),
            IMDbUrl = movie.IMDbUrl
        };

    public class ReviewSummary
    {
        [Range(1, 10)]
        public decimal? User { get; set; }
        public int UserCount { get; set; } = 0;

        [Range(1, 100)]
        public int? MetaScore { get; set; }
    }
}