import { ActorSummary } from "./actor-summary";
import { Movie as DbMovie } from "models/movie";
import { Min, Max, IsNotEmpty } from "class-validator";

class ReviewSummary {
    @Min(1) @Max(10)
    user?: number;

    userCount: number = 0;

    @Min(1) @Max(100)
    metaScore: number;
}

export class Movie {
    id: number;

    @IsNotEmpty()
    title: string;
    description?: string;
    year?: number;
    rating?: string;
    review: ReviewSummary = new ReviewSummary;
    languages: string[] = [];
    actors: ActorSummary[] = [];

    @IsNotEmpty()
    imdb_url: string;

    public static fromDatabase(movie: DbMovie): Movie {
        return {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            year: movie.year,
            rating: movie.rating,
            imdb_url: movie.imdb_url,
            review: {
                metaScore: movie.review.metaScore,
                userCount: movie.review.userCount,
                user: movie.review.userScore
            },
            languages: movie.languages?.map(m => m.name) ?? [],
            actors: movie.actors?.map(ActorSummary.fromDatabase) ?? []
        };
    }
}