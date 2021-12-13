import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import { MainRouter } from 'routes/main-router';
import * as cors from 'cors';

// The main application file, where we configure all middleware (in config())
// and all routing (through the MainRouter class) in that order.
class App {
    public app: express.Application;
    
    constructor() {
        this.app = express();

        // Configure middleware
        this.config();

        // Configure routes
        (new MainRouter()).attach(this.app);
    }

    private config(): void {
        // We configure CORS to allow all origins/requests. Do NOT use such
        // a configuration for a real production app!
        this.app.use(cors())

        // We allow for JSON to be in the request body (POST/PUT)
        this.app.use(bodyParser.json());

        // We log all incoming requests
        this.app.use(morgan('combined'));
    }
}

export default new App().app;