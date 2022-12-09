using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace RUG.WebEng.Movies.Models;

// The "owned" attribute means that this class is not a table on its own,
// but that the properties in this class will be stored in the same table
// as where the entity holding a reference to this class is stored.
//
// In our case: Movies has a property that refers to a Review, so the fields
// in this class will be stored in the movies table.
[Owned]
public class Review
{
    public int UserCount { get; set; } = 0; // default value of a property

    [Range(0, 10)]
    public decimal? UserScore { get; set; }

    [Range(0, 100)]
    public int? MetaScore { get; set; }
}