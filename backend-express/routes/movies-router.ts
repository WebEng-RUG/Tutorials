import { MoviesController } from "controllers/movies-controller";
import { Application } from "express";
import { IRouter } from "./irouter";
import * as asyncHandler from "express-async-handler";

export class MoviesRouter implements IRouter {
    protected controller : MoviesController = new MoviesController;

    public attach(app: Application): void {
        app.route('/movies')
            .get(asyncHandler(this.controller.getAllAsync))
            .post(asyncHandler(this.controller.createAsync));

        app.route('/movies/:id')
            .get(asyncHandler(this.controller.getMovieAsync))
            .put(asyncHandler(this.controller.updateMovieAsync))
            .delete(asyncHandler(this.controller.deleteMovieAsync));
    }
}