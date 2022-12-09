using System.ComponentModel.DataAnnotations;

namespace RUG.WebEng.Movies.Models;

public class Language
{
    [Key] // Indicates this is the primary key of the table
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    public ICollection<Movie> Movies { get; set; } = new List<Movie>();
}