import { MovieSummary } from './movie-summary.model';

/**
 * Interfaces for the Actor model, used for the Actor components
 * This is how the Actor model when returned from the backend
 * 
 * @key id the id of the actor
 * @key name the name of the actor
 * @key movies an array of a movie, which is the list of movies an actor has played a part of
 */
interface ActorSummary {
    id: number,
    name: string,
    movies: [MovieSummary]
}

/**
 * Here we export our types / interfaces that are needed by other
 * parts of the project
 */
export type {
    ActorSummary
};

