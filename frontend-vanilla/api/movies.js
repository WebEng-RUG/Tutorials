import MovieSummary from "../models/movie-summary.js";
import Movie from "../models/movie.js";
import apiCall from "./call.js";

export default {
    /**
     * Find a list of movies with the selected filters
     * 
     * @param {string} title 
     * @param {string} year 
     * @param {number} limit 
     * @param {number} offset 
     * @returns {Promise<MovieSummary[]>}
     */
    async getMovies(title = null, year = null, limit = 100, offset = 0) {
        const apiResponse = await apiCall("movies", "GET", {
            title: title,
            year: year,
            limit: limit,
            offset: offset
        });

        // Very rudimentary error handling - you want to do something more
        // extensive here. For example: retry requests when a 5xx response
        // hits with exponential back-off, and for other requests
        // we would want to handle all "expected" error codes properly as
        // well and want to inform the user what went wrong.
        //
        // For example in the case of a POST request, the result might
        // be a validation error, then we want to show that to the user.
        if(!apiResponse.ok) throw new Error(await apiResponse.text());

        return (await apiResponse.json()).map(MovieSummary.fromJson);
    },

    /**
     * Finds a specific movie
     * 
     * @param {number} id 
     * @returns {Promise<Movie>}
     */
    async getMovie(id) {
        const apiResponse = await apiCall(`movies/${id}`, "GET");
        if(!apiResponse.ok) throw new Error(await apiResponse.text());

        return Movie.fromJson(await apiResponse.json());
    },
}