import { Application } from "express";
import { ActorsRouter } from "./actors-router";
import { IRouter } from "./irouter";
import { MoviesRouter } from "./movies-router";

// This "main router" combines all controller-specific routers
// and registers all their routes.
export class MainRouter implements IRouter {
    public attach(app: Application): void {
        (new MoviesRouter()).attach(app);
        (new ActorsRouter()).attach(app);
    }
}