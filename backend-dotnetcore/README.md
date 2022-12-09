# ASP.NET Core Movies API backend

This directory contains an example implementation of the Movies API backend as specified in `../specification/spec.yml`. As explained in the tutorial slides; the implementation makes use of the MVC (Model-View-Controller) pattern. Since this is an API, the "View" is only the data model used in the API requests/responses as provided in the `ApiModels` directory. The controllers and models are provided in the respective directories.

For working with this code, I recommend to use Visual Studio Code (Win/Mac/Linux, with the C# plugin), or the full Visual Studio IDE (Win/Mac). Within VS Code, you can simply open the root directory of this repository; for full VS I recommend to open just the `Movies.csproj` file - it will load all other things required.

## Getting Started

The best way to run this application is using Docker (Compose). The instructions on how to do this are provided in the main `README`. The instructions below are on how to run the application locally.

Prerequisites:

- A MySQL-compatible database. The easiest solution is to run only the database in Docker, by running `docker compose up mariadb` when following the instructions from the main README. Otherwise, you'll have to set up a database manually. Make sure to have the following details at hand: the host and port (usually `localhost` and `3306`), the database name (`movies` for the one in Docker; or some other name you defined yourself) and the username/password of an account with access to that database (`mariadb`/`mariadb` for the one in Docker).
- The .NET 7.0 SDK and ASP.NET Core 7.0 Runtime ([instructions](https://dotnet.microsoft.com/en-us/download)) - you should be able to run `dotnet --list-sdks` and have at least some version `7.x.x` installed.

The first step is to create an instance of a `.env` file in the root directory of the repository by copying `.env.example` and adjusting the parameters (particularly for the database) to match what you have set up yourself. The example values are sufficient for the database started through Docker.

After this, you should be able to run `dotnet watch run` in the current directory, and it will start the webserver, open your browser, and take you to the automatically-generated Swagger documentation.

## What's in the box

This application is a fairly standard .NET Core Web API implementation, using Entity Framework as ORM to connect to the database. Very few third-party packages are included. Some notable features:

- The database can be created and seeded automatically using EF migrations and a seeder that was written to convert the source `json` file into database format.
- The application automatically generates interactive Swagger documentation/OpenAPI specification of the implementation that will always match what you implemented - this might be particularly interesting for the Web Engineering course.

## How configuration works

There are multiple ways to configure the backend with all the information required (such as database credentials) to get the app running.

- **Through `.env` files**: This is the main way used when running the application outside of Docker. Upon start, the application will try to read a `.env` file anywhere in the file path up to this folder (so the current folder and any parents), which it will find if you set it up correctly. These settings will be put in the current process environment. Afterwards, it will also find and read the `dotnet.env` file in this directory, which uses the "shared" configuration to create .NET-specific configuration settings for the database (the connection string) and the listening port.
- **Through environment variables**: This is how Docker configures the app when running inside Docker. The `docker-compose.yml` file in the repository root will propagate the properties from the main `.env` file into environment variables of the process, which will then directly get the proper connection string.
- **Through `appsettings.x.json` files**: This method is currently not used, but is the "traditional" way of configuring .NET applications.

In practice, during startup, .NET will take various configuration sources and merge them together, in the following order:

1. `appsettings.json`
2. `appsettings.<Environment>.json`
3. Environment variables
4. Command-line arguments
