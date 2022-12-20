/**
 * Here we describe how a movie from our API looks like
 * Essentially the same as our api-model in the backend
 * 
 * @key id the id of the movie
 * @key title the title of the movie
 * @key year the year the movie was released in
 * @key rating the rating of the movie
 */
interface MovieSummary {
    id: number;
    title: string;
    year: number;
    rating: string;
}



/**
 * Now we export the interfaces / types needed by other parts of the code
 */
export type {
    MovieSummary
}