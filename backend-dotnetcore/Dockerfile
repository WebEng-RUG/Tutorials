# This file is a Dockerfile - it specifies how a docker container should be built
# and is supposed to be reproducible: so it yields the same application every single
# time.

# To be specific, this is a multi-stage Dockerfile, in this case it means that
# we use a "heavy" SDK image with all compiler tools to build the application, but
# then only use the runtime and generated binaries when actually running the app.
# This allows us to make the resulting image much smaller in size, which is preferable.

# We start off by using the SDK to build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# We first copy ONLY the project definition file, instead of all files at once.
# This prevents us from having to restore all dependencies (slow) every time
# we build, since every step in the Dockerfile build process is reusable. So
# if only our code changes, but our project file (incl. dependencies) does not,
# we can skip these two steps before recompiling, saving us quite some time.
#
# So we copy the project file and download all dependencies
COPY ["Movies.csproj", "./"]
RUN dotnet restore "Movies.csproj"

# Now we can copy all source files (except those listed in `.dockerignore`)
# and build the application
COPY [".", "./"]
RUN dotnet build "Movies.csproj" --no-restore -c Debug -o /app


##########
# The next step is to take the built/compiled source code and package it
# into a single "publishable" binary
FROM build as publish
RUN dotnet publish "Movies.csproj" -c Debug -o /app

#########
# Then, we start over with a completely clean (and lean) environment
# that just contains the ASP.NET runtime. Here, we copy over the
# built and packaged binary files from the other environment to be able to run it.
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app

# We expose port 80 as the default port on which our app runs.
EXPOSE 80

COPY --from=publish /app .

# We set the default action to run when the container is started; it should
# start our application.
ENTRYPOINT [ "dotnet", "Movies.dll" ]
