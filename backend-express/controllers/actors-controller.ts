import { Request, Response } from "express";
import { plainToClassFromExist } from "class-transformer";
import { validate } from "class-validator";
import { Paging } from "./helpers";
import { Actor } from "models/actor";
import { getConnection } from "typeorm";
import { ActorSummary } from "api-models/actor-summary";
import { Actor as ApiActor } from "api-models/actor";
import { MovieSummary } from "api-models/movie-summary";

export class ActorsController {
    public async getAllAsync (req: Request, res: Response): Promise<void> {
        const paging = plainToClassFromExist(new Paging<Actor>(), req.query, { enableImplicitConversion: true });

        let validationResult = await validate(paging, { validationError: { target: false }});
        if(validationResult.length > 0) {
            res.status(400);
            res.json({ error: "Invalid paging settings", details: validationResult });
            return;
        }

        let query = getConnection().getRepository(Actor).createQueryBuilder("actor");
        query = paging.apply(query);

        let actors = await query.getMany();
        res.json(actors.map(ActorSummary.fromDatabase));
    }

    public async getActorAsync (req: Request<{ id: number }>, res: Response): Promise<void> {
        let actor = await getConnection().getRepository(Actor).findOne(req.params.id, { relations: ["movies"] });

        if(!actor) {
            res.status(404);
            res.json();
            return;
        }

        res.json(ApiActor.fromDatabase(actor));
    }

    public async getActorMoviesAsync (req: Request<{ id: number}>, res: Response): Promise<void> {
        let actor = await getConnection().getRepository(Actor).findOne(req.params.id, { relations: ["movies"] });

        if(!actor) {
            res.status(404);
            res.json();
            return;
        }

        res.json(actor.movies.map(MovieSummary.fromDatabase));
    }
}