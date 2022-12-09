# ExpressJS Movies API backend

This directory contains an example implementation of the Movies API backend as specified in `../specification/spec.yml`. As explained in the tutorial slides; the implementation makes use of the MVC (Model-View-Controller) pattern. Since this is an API, the "View" is only the data model used in the API requests/responses as provided in the `api-models` directory. The controllers and models are provided in the respective directories.

The application is written in TypeScript instead of "traditional" JavaScript, to provide some sense of type-safety and to have some nicer language features to our disposal, such as decorations (annotations/attributes). This makes it much easier to deal with entities in an ORM (TypeORM). It would also allow us to make the routing part a lot easier (similar to how .NET does it), but then it goes beyond what this project aims to demonstrate: how to build an ExpressJS application and how the framework works.

The architecture of the code in this application is not as "nice" as the .NET implementation, as TypeScript is a bit harder to work with sometimes. The main point of differentiation is how much direct database operations are done in the controllers - whereas you would like the controllers to be unaware of the storage implementation if possible.

For working with this code, I recommend to use Visual Studio Code (Win/Mac/Linux, with the `npm` plugin). Open the root directory of the entire repository.

## Getting Started

The best way to run this application is using Docker (Compose). The instructions on how to do this are provided in the main `README`. The instructions below are on how to run the application locally.

Prerequisites:

- A MySQL-compatible database. The easiest solution is to run only the database in Docker, by running `docker-compose up mariadb` when following the instructions from the main README. Otherwise, you'll have to set up a database manually. Make sure to have the following details at hand: the host and port (usually `localhost` and `3306`), the database name (`movies` for the one in Docker; or some other name you defined yourself) and the username/password of an account with access to that database (`mariadb`/`mariadb` for the one in Docker).
- NVM (Node Version Manager) to install the correct node version to use in this project specifically. Installation instructions [here](https://github.com/nvm-sh/nvm), you should be able to run `nvm --version` and have a version >=2.x.x.

The first step is to actually install the correct Node version by running `nvm install` and `nvm use`. Then, create an instance of a `.env` file in the root directory of the repository by copying `.env.example` and adjusting the parameters (particularly for the database) to match what you have set up yourself. The example values are sufficient for the database started through Docker.

After this, you should be able to run `npm start` in the current directory, and it will start the webserver. You will be able to open your browser and go to `localhost:xxxx` with the port you specified.
