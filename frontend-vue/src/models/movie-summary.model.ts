/**
 * Type for movie that is receive from the API when getting the list of movies.
 */
export interface MovieSummary {
  id: number;
  title: string;
  year: number;
  rating: string;
}
