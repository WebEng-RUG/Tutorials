import { MovieSummary } from "./movie-summary";
import { Actor as DbActor } from "models/actor";

export class Actor {
    id: number;
    name: string;
    movies: MovieSummary[] = [];

    public static fromDatabase(actor : DbActor) : Actor {
        return {
            id: actor.id,
            name: actor.name,
            movies: actor.movies?.map(MovieSummary.fromDatabase) ?? []
        };
    }
}