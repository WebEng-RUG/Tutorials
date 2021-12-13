import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { Actor } from "models/actor";
import { Language } from "models/language";
import { Movie } from "models/movie";
import { config as dotenvConfig } from "dotenv";
import * as dotenvExpand from "dotenv-expand";

// This import will already do all middleware and routing registrations for us.
// No need to configure the application itself further, just the configuration and
// the server now.
import app from "./app";

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

// We load our ORM configuration and make sure to expand
// any variable-references in it.
dotenvExpand(dotenvConfig({ path: "./ormconfig.env" }));

// Then we obtain our connection information, specify which entities
// we would like to use and create a connection. This returns a JS Promise,
// which we can use to do asynchronous operations. In all other code, we use
// async/await, but in the main/root program we need to use callbacks still.
// The .then branch will execute when it succeeds, the .catch branch will run
// when an error occurs.
getConnectionOptions().then(options => {
    Object.assign(options, { entities: [
        Actor, Language, Movie
    ]});

    return createConnection(options);
}).then(_ => {
    // Now that the connection is set up, we start listening for incoming requests.
    app.listen(PORT, HOST, () => console.log(`Express server listening on port ${PORT}`));
}).catch(error => console.log(error));