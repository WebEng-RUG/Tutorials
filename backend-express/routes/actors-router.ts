import { ActorsController } from "controllers/actors-controller";
import { Application } from "express";
import { IRouter } from "./irouter";
import * as asyncHandler from "express-async-handler";

export class ActorsRouter implements IRouter {
    protected controller : ActorsController = new ActorsController;

    public attach(app: Application): void {
        app.route('/actors')
            .get(asyncHandler(this.controller.getAllAsync));

        app.route('/actors/:id')
            .get(asyncHandler(this.controller.getActorAsync));
            
        app.route('/actors/:id/movies')
            .get(asyncHandler(this.controller.getActorMoviesAsync));
    }
}