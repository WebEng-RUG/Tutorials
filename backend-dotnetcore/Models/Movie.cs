using System.ComponentModel.DataAnnotations;

namespace RUG.WebEng.Movies.Models;

public class Movie
{
    [Key] // Indicates this is the primary key of the table
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }
    public string? Rating { get; set; } // Could possibly be an enum
    public int? Year { get; set; }
    public string? Description { get; set; }
    public Review Review { get; set; } = new Review();
    public ICollection<Actor> Actors { get; set; } = new List<Actor>();
    public ICollection<Language> Languages { get; set; } = new List<Language>();

    [Required]
    public string IMDbUrl { get; set; }
}