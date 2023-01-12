import type ActorSummary from "./actor-summary.model";

/**
 * Type for movie that is receive from the API when getting details for a particular movie.
 */
export default interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  rating: string;
  review: {
    user: number;
    userCount: number;
    metaScore: number;
  };
  languages: string[];
  actors: ActorSummary[];
  imdb_url: string;
}

