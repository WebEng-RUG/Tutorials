# Web Engineering Tutorials

This repository contains pieces of an example version of the project to be performed for the course Web Engineering taught at RuG. The work centers around a series of tutorials taught throughout the course, all working on building out the same application.

This repository currently contains an API specification (in `./specification`) in OpenAPI 3.x format, as well as two different backend implementations, one using ExpressJS with TypeScript and one using the ASP.NET Core framework.

You can quickly start exploring/editing without cloning the repository in two ways:
- Open the code in an editor online: press `Ctrl+Shift+K` in your browser, type "github.dev" and choose "Open in github.dev editor". You will see an online editor with all this code to explore.
- Open the code on your own machine, but remotely. Make sure to install [VS Code](https://code.visualstudio.com/download) with the ["Remote Development"](ms-vscode-remote.vscode-remote-extensionpack) and ["GitHub Repositories"](https://marketplace.visualstudio.com/items?itemName=GitHub.remotehub) plugins. Then, open a new window in VS Code, press `Ctrl+Shift+P`, type "github repositories open" and choose the respective option, then pase the URL of this repository. The repository will open in a local editor, with all the files remotely mounted.

Any suggestions for improvement are more than welcome!

-- Floris Westerman

## Running the application

There are two main ways to run the application with all its components: using Docker, or manually on your local machine. The Docker-route is easiest to get going, but the local option requires less prerequisite knowledge. This README will detail the first option, the instructions for the second option are app-specific and can be found in the respective subfolders.

To go for the Docker-route, you will need to install Docker and Docker Compose. Instructions can be found all over the internet, [for Windows](https://docs.docker.com/desktop/windows/install/), [for Mac](https://docs.docker.com/desktop/mac/install/), as well as [for Ubuntu](https://docs.docker.com/engine/install/ubuntu/) and [other distros](https://docs.docker.com/engine/install/). Docker Compose on Linux will need an [additional install](https://docs.docker.com/compose/cli-command/#install-on-linux).

Once you are set up, ensure you are running Docker Engine version >=19.03 by running `docker --version` and Docker Compose version >=1.27.0 by running `docker-compose --version`.

The next step is to set up a configuration file `.env` by copying the template file `.env.example` and adjusting any settings you might want to adjust, but the defaults should work fine. Specifically, check whether the ports configured are suitable. For example, you might have a MySQL/MariaDB server running yourself on port 3306 already, then you would want to choose a different port.

Finally, you can get going by running `docker-compose up` in the project main directory. It should now automatically build the docker images and start the services: a database, and both backends. It will also automatically seed the database based on the SQL export in the `/data/sql` folder. You will see the import process notices scroll by - wait until all 6 tables have been imported and the database is up. This can easily take 10-20 minutes.

## Accessing the applications

After starting all services and seeding the database, you should be able to access the backend applications at `localhost:xxxx`, where you specify the ports you set in your `.env` file. To simplify doing the POST/CREATE/PUT requests, you could open the project in [VS Code](https://code.visualstudio.com/download) with the [OpenAPI plugin](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) installed. If you then open the API specification (`specification/spec.yml`) and open the interactive preview (`Ctrl+Shift+P`, search for "OpenAPI preview"), from where you are able to send requests to both backends.

## How the configuration works

For those interested, here is a quick explanation of how the configuration in the `.env` file is propagated to the applications. The settings in the `.env` file get picked up by Docker Compose, where they will be passed on to environment variables for the applications. Both backends take these environment variables and use them for their runtime configuration.
