import { Request, Response } from "express";
import { Movie } from "models/movie";
import { Movie as ApiMovie } from "api-models/movie";
import { Any, DataSource, Raw, SelectQueryBuilder } from "typeorm";
import { IQueryHelper, Paging } from "./helpers";
import { MovieSummary } from "api-models/movie-summary";
import { Actor } from "models/actor";
import { Language } from "models/language";
import { plainToClass, plainToClassFromExist } from "class-transformer";
import { validate } from "class-validator";
import Container from "typedi";

export class MoviesController {
    public async getAllAsync (req: Request, res: Response): Promise<void> {
        // In Express, we need to convert our request query to actual class instances ourselves.
        // Since JS is not a static language, we need to explicitly instantiate new classes to
        // have any functions to our disposal, since "req.query" could contain any kind of
        // "garbage" values that we need to validate. We use the class-transformer and
        // class-validator packages for this.
        const filter = plainToClass(Filter, req.query, { enableImplicitConversion: true });
        const order = plainToClass(Order, req.query, { enableImplicitConversion: true });
        const paging = plainToClassFromExist(new Paging<Movie>(), req.query, { enableImplicitConversion: true });

        // We validate that the paging query is valid according to the rules set
        let validationResult = await validate(paging, { validationError: { target: false }});
        if(validationResult.length > 0) {
            res.status(400);
            res.json({ error: "Invalid paging settings", details: validationResult });
            return;
        }

        // We create a movies query and apply the sorting/filtering/paging
        let query = Container.get<DataSource>("database").getRepository(Movie).createQueryBuilder("movie");
        query = filter.apply(query);
        query = order.apply(query);
        query = paging.apply(query);

        // We asynchronously retrieve the results from the database, convert those
        // to API models and send them to the client.
        let movies = await query.getMany();
        res.json(movies.map(MovieSummary.fromDatabase));
    }

    public async createAsync (req: Request, res: Response): Promise<void> {
        // We again convert the request body to a proper class
        const apiMovie = plainToClass(ApiMovie, req.body, { enableImplicitConversion: true });

        // And we validate that the data is valid
        const validationResult = await validate(apiMovie, { validationError: { target: false }});
        if(validationResult.length > 0) {
            res.status(400);
            res.json({ error: "Movie validation error", details: validationResult });
            return;
        }

        // Then we convert the API model into a real application model
        let movie : Movie = {
            id: 0,
            title: apiMovie.title,
            description: apiMovie.description ?? null,
            imdb_url: apiMovie.imdb_url,
            year: apiMovie.year ?? null,
            rating: apiMovie.rating ?? null,
            review: {
                metaScore: apiMovie.review?.metaScore ?? null,
                userCount: apiMovie.review?.userCount ?? 0,
                userScore: apiMovie.review?.user ?? null
            },
            actors: [],
            languages: []
        };

        // We check that the movie does not yet exist
        const movieRepository = Container.get<DataSource>("database").getRepository(Movie);

        const existingCount = await movieRepository
            .createQueryBuilder("movie")
            .where("movie.title = :title", { title: movie.title })
            .orWhere("movie.imdburl = :url", { url: movie.imdb_url })
            .getCount();

        if(existingCount > 0) {
            res.status(409); // Conflict
            res.json({ error: "Movie already exists" });
            return;
        }

        // Find the actors and languages - we do not create new actors and languages
        // to keep the code a bit simpler.
        movie.actors = await Container.get<DataSource>("database").getRepository(Actor)
            .createQueryBuilder("actor")
            .where("actor.name IN (:...names)", { names: apiMovie.actors.map(a => a.name) })
            .getMany();

        movie.languages = await Container.get<DataSource>("database").getRepository(Language)
            .createQueryBuilder("lang")
            .where("lang.name IN (:...names)", { names: apiMovie.languages })
            .getMany();

        // Store the new movie
        let dbEntry = movieRepository.create(movie);
        await movieRepository.save(dbEntry);

        res.json(dbEntry.id);
    }

    public async getMovieAsync (req: Request<{ id: number }>, res: Response): Promise<void> {
        let movie = await Container.get<DataSource>("database").getRepository(Movie).findOneBy({
            id: Raw(c => `${c} = :id`, { id: req.params.id })
        });

        if(!movie) {
            res.status(404);
            res.json("");
            return;
        }
        
        res.json(ApiMovie.fromDatabase(movie));
    }

    public async updateMovieAsync (req: Request<{ id: number }, {}, ApiMovie>, res: Response): Promise<void> {
        const apiMovie = plainToClass(ApiMovie, req.body, { enableImplicitConversion: true });
        const validationResult = await validate(apiMovie, { validationError: { target: false }});
        if(validationResult.length > 0) {
            res.status(400);
            res.json({ error: "Movie validation error", details: validationResult });
            return;
        }

        const movieRepository = Container.get<DataSource>("database").getRepository(Movie);
        let movie = await movieRepository.findOneBy({
            id: Raw(c => `${c} = :id`, { id: req.params.id })
        });

        if(!movie) {
            res.status(404);
            res.json();
            return;
        }

        movie.title = apiMovie.title;
        movie.description = apiMovie.description ?? null;
        movie.imdb_url = apiMovie.imdb_url;
        movie.year = apiMovie.year ?? null;
        movie.rating = apiMovie.rating ?? null;
        movie.review.metaScore = apiMovie.review?.metaScore ?? null;
        movie.review.userCount = apiMovie.review?.userCount ?? 0;
        movie.review.userScore = apiMovie.review?.user ?? null;
        
        movie.actors = await Container.get<DataSource>("database").getRepository(Actor)
            .createQueryBuilder("actor")
            .where("actor.name IN (:...names)", { names: apiMovie.actors.map(a => a.name) })
            .getMany();

        movie.languages = await Container.get<DataSource>("database").getRepository(Language)
            .createQueryBuilder("lang")
            .where("lang.name IN (:...names)", { names: apiMovie.languages })
            .getMany();

        await movieRepository.save(movie);
        res.json(ApiMovie.fromDatabase(movie));
    }

    public async deleteMovieAsync (req: Request<{ id: number }>, res: Response): Promise<void> {
        const movieRepository = Container.get<DataSource>("database").getRepository(Movie);
        let movie = await movieRepository.findOneBy({
            id: Raw(c => `${c} = :id`, { id: req.params.id })
        });
        
        if(!movie) {
            res.status(404);
            res.json();
        } else {
            await movieRepository.delete(req.params.id);
            res.json();
        }
    }
}

class Order implements IQueryHelper<Movie> {
    "order-by": string;
    "order-dir": string;

    public apply(query : SelectQueryBuilder<Movie>) : SelectQueryBuilder<Movie> {
        if(!this["order-by"] || !this["order-dir"]) return query;
        return query.orderBy(this["order-by"], this["order-dir"] === "desc" ? "DESC" : "ASC");
    }
}

class Filter implements IQueryHelper<Movie> {
    title?: string;
    year?: number;

    public apply(query : SelectQueryBuilder<Movie>) : SelectQueryBuilder<Movie> {
        if(this.title) query = query.andWhere("movie.title = :title", { title: this.title });
        if(this.year) query = query.andWhere("movie.year = :year", { year: this.year });
        return query;
    }
}
