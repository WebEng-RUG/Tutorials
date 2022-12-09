import { Movie as DbMovie } from "models/movie";

export class MovieSummary {
    id: number;
    title: string;
    year?: number;
    rating?: string;

    public static fromDatabase(movie : DbMovie) : MovieSummary {
        return {
            id: movie.id,
            title: movie.title,
            rating: movie.rating,
            year: movie.year
        };
    }
}