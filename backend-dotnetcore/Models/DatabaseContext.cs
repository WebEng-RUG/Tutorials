namespace RUG.WebEng.Movies.Models;

using Microsoft.EntityFrameworkCore;

// A "DbContext" implementation represents a connection to the database through
// Entity Framework. You typically define two things here:
// 1. All entities that you want to include in your database - those will
//    be converted into tables and you add them by adding a property of type
//    DbSet<T> to this class.
// 2. Any additional configuration you did not put in attributes in the entity
//    classes themselves. In this case, we configure explicitly the many-to-many
//    relation between movies and actors, and movies and languages.
public class DatabaseContext : DbContext
{
    public DbSet<Actor> Actors { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public DbSet<Language> Languages { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Movie>()
            .HasMany(m => m.Actors)
            .WithMany(a => a.Movies);

        modelBuilder.Entity<Movie>()
            .HasMany(m => m.Languages)
            .WithMany(l => l.Movies);
    }
}