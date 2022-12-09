using System.ComponentModel.DataAnnotations;

namespace RUG.WebEng.Movies.Models;

public class Actor
{
    [Key] // Indicates this is the primary key of the table
    public int Id { get; init; }

    [Required]
    public string Name { get; set; }

    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}
