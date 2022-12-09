// There is a lot of syntactic sugar in this file,
// or well, lack of code. Modern C# has many shorthands that allow
// us to prevent writing boilerplate for Main() and such. So basically,
// we are dropped in Main() immediately here.

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using RUG.WebEng.Movies.Models;
using RUG.WebEng.Movies.Repositories;

// We parse two "dotenv" files that contain the shared database/port configuration
// for all parts of the application. Typically, you would configure a .NET app
// through `appsettings.X.json` files, but in this case we want to share the same
// config between multiple apps without redefining the same settings in multiple
// places, so a dotenv file is the "canonical" way to do this.
//
// This line will put the result from parsing these files into the current
// process environment, so they will be available as normal "environment variables"
DotNetEnv.Env.TraversePath().NoClobber().LoadMulti(new[] { ".env", "dotnet.env" });

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// Setting up a .NET Core application (Web App, Console App, whatever) typically has
// two "phases": we first configure the IoC/DI system (Inversion of Control, Dependency
// Injection), which will allow us to easily switch implementations/settings without
// changing the real application code. This includes registering any policies/connections/
// whatever we might be using - even if we don't always end up using them.
// In the second step we define how the app should behave when a request comes in,
// and what it should do when. That part is typically shorter.

// We can now properly start setting up and configuring our application class.
// We start by creating a WebApp "Builder" for configuration
var builder = WebApplication.CreateBuilder(args);

// We then register all services to the IoC container, this will
// allow us to inject them into our controllers and other classes.

// Add database connection
var dbConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
Console.WriteLine($"Using database connection string: {dbConnectionString}");
builder.Services.AddDbContext<DatabaseContext>(options =>
    options.UseMySql(dbConnectionString, ServerVersion.AutoDetect(dbConnectionString)));

// We say that in developer mode, Entity Framework might give us some hints
// about database errors
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Add repository classes we created ourselves - see docs over there for more
// We register them "scoped" so they are recreated for every new request - the
// default for database connections
builder.Services.AddScoped<MovieRepository>();
builder.Services.AddScoped<ActorRepository>();
builder.Services.AddScoped<LanguageRepository>();

// Say we will be using controller classes
builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Indicate we would like ENUM values to be converted to strings in their
    // JSON representation, as opposed to meaningless integers
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Say we will be using tools to analyse the exposed API surface
builder.Services.AddEndpointsApiExplorer();

// Say we will be exposing automatically-generated Swagger/OpenAPI docs
builder.Services.AddSwaggerGen(config =>
{
    config.EnableAnnotations(); // we will use attributes for further specification
});

// Register a CORS policy that allows traffic from all sources (do NOT use this
// in this form for real production applications!)
builder.Services.AddCors(options =>
{
    options.AddPolicy("default", builder =>
        builder
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowAnyOrigin()
    );
});

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

// Then we build the app and its IoC container, so we can configure
// the lifecycle, including routing and middleware.
var app = builder.Build();

// We only enable auto-seeding of the database if we enable the preprocessor step
// below. Default is disabled since this takes over 45 minutes - it is quicker to
// use the provided `.sql` files and import those.
#if false
    using var scope = app.Services.CreateScope();
    using var context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    await DatabaseSeeder.InitializeAsync(context);
#endif

// Specify which CORS policy to use - registered above
app.UseCors("default");

// If we are in development, we enable Swagger UI
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Find all Controller classes/implementations in the current application and
// register their routes and operations.
app.MapControllers();

// Run the app
app.Run();
