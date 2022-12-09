import "reflect-metadata";
import { DataSource } from "typeorm";
import { Actor } from "models/actor";
import { Language } from "models/language";
import { Movie } from "models/movie";
import { config as dotenvConfig } from "dotenv";
import { expand as dotenvExpand } from "dotenv-expand";

// This import will already do all middleware and routing registrations for us.
// No need to configure the application itself further, just the configuration and
// the server now.
import app from "./app";
import Container from "typedi";

// We check if we are in development; if so we want to load
// specific development configuration in .env files.
if(process.env.NODE_ENV !== "production") {
    console.log("The server is run in development mode!");

    // Load development configuration
    dotenvConfig({ path: "../.env" });
    dotenvExpand(dotenvConfig({ path: "./express.env" }));
}

// We determine the host and port based on the environment provided
const PORT = process.env.PORT as unknown as number || 3000;
const HOST = process.env.HOST || "localhost";

// We set up the database connection through a DataSource. We obtain
// the settings to apply from our environment (as set up above), and
// we specify which entities we would like to use.
const database = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT as unknown as number || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Actor, Language, Movie
    ],
    synchronize: false,
    logging: false
});

// We set up the connection to the database. This returns a JS Promise, which
// we can use to do asynchronous operations. In all other code, we use async/await
// directly, but in the main/root program we need to use callbacks still. The
// .then branch will execute then the database connection succeeds, the .catch
// branch will run when an error occurs.
database.initialize().then(database => {
    // We store the database connection in our DI container, which allows us
    // to obtain the instance later on without having to pass it around everywhere
    // ourselves.
    Container.set<DataSource>("database", database);

    // Start the web server
    app.listen(PORT, HOST, () => console.log(`Express server listening on port ${PORT}`));
}).catch(console.log);
