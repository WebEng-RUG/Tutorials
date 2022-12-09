using System.Buffers;
using System.Buffers.Text;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace RUG.WebEng.Movies.Models;

// This class is just written to import the movie data from the json file
// into the database. It first parses the JSON into a list of objects (of
// type JsonMovieModel) and then adds each of these items to the Database.
// It is painfully slow.
public class DatabaseSeeder
{
    // A custom JsonConverter that is able to properly parse the "number of votes"
    // field in the JSON data that has a pesky thousands separator and is formatted
    // as a string. By default, .NET can parse numbers from strings, and can parse
    // thousands separators, but not both simultaneously.
    private class ThousandsConverter : JsonConverter<int>
    {
        public override void Write(Utf8JsonWriter writer, int value, JsonSerializerOptions options)
        {
            throw new NotImplementedException();
        }

        // Inspired by the actual JsonConverter implementations in the .NET repo
        private ReadOnlySpan<byte> GetUnescaped(ref Utf8JsonReader reader)
        {
            var span = reader.HasValueSequence ? reader.ValueSequence.ToArray() : reader.ValueSpan;
            return span;
        }

        public override int Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            var str = GetUnescaped(ref reader);

            if (Utf8Parser.TryParse(str, out int res, out int bytes, 'N') && str.Length == bytes)
            {
                return res;
            }
            else
            {
                throw new FormatException("Invalid number");
            }
        }
    }

    private class JsonMovieModel
    {
        public string? Title { get; set; }
        public string? Rating { get; set; }
        public int? Year { get; set; }
        [JsonPropertyName("users_rating")] public decimal? UsersRating { get; set; }
        [JsonConverter(typeof(ThousandsConverter))] public int? Votes { get; set; }
        public int? MetaScore { get; set; }
        public string[]? Languages { get; set; }
        public string[]? Actors { get; set; }
        public string? Description { get; set; }
        [JsonPropertyName("imdb_url")] public string? IMDbUrl { get; set; }
    }

    public static async Task InitializeAsync(DatabaseContext context)
    {
        await context.Database.EnsureCreatedAsync();

        // Check whether there are already any movies in the database
        if (await context.Movies.AnyAsync())
        {
            return;
        }

        // Otherwise, open data file
        var dataFile = File.OpenRead("../data/movie.json");
        var results = await JsonSerializer.DeserializeAsync<List<JsonMovieModel>>(dataFile, new JsonSerializerOptions
        {
            AllowTrailingCommas = true,
            PropertyNameCaseInsensitive = true,
            NumberHandling = JsonNumberHandling.AllowReadingFromString
        });

        // Create language/actor reference lists
        var actors = new List<Actor>();
        var languages = new List<Language>();

        // Process items and add them to database
        foreach (var item in results)
        {
            if (item.Title == null) continue;
            if (item.IMDbUrl == null) continue;

            var movie = new Movie
            {
                Title = item.Title,
                Description = item.Description,
                Rating = item.Rating,
                Year = item.Year,
                IMDbUrl = item.IMDbUrl,
                Review = new Review
                {
                    MetaScore = item.MetaScore,
                    UserCount = item.Votes ?? 0,
                    UserScore = item.UsersRating
                },
                Languages = item.Languages?.Select(l =>
                {
                    var lang = languages.FirstOrDefault(s => s.Name == l);
                    if (lang == null)
                    {
                        lang = new Language { Name = l };
                        languages.Add(lang);
                    }
                    return lang;
                }).ToList() ?? new List<Language>(),
                Actors = item.Actors?.Select(a =>
                {
                    var actor = actors.FirstOrDefault(s => s.Name == a);
                    if (actor == null)
                    {
                        actor = new Actor { Name = a };
                        actors.Add(actor);
                    }
                    return actor;
                }).ToList() ?? new List<Actor>()
            };

            context.Movies.Add(movie);
        }
        context.Actors.AddRange(actors);
        context.Languages.AddRange(languages);

        await context.SaveChangesAsync();
    }
}