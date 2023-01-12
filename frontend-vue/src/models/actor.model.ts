import type Movie from "./movie.model";

/**
 * Type for actor that is receive from the API when getting details for a particular actor.
 */
export default interface Actor {
  id: number;
  name: string;
  movies: Movie[];
}
