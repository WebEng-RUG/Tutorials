import MovieSummary from "./movie-summary.js";

export default class Actor {
    /** @type {number} */
    id;

    /** @type {string} */
    name;

    /** @type {MovieSummary[]} */
    movies = [];

    /**
     * Convert from JSON to Actor instance
     * @param {object} json JSON returned by API
     * @returns {Actor}
     */
    static fromJson(json) {
        let summary = new Actor();
        summary.id = json.id;
        summary.name = json.name;
        summary.movies = json.movies.map(MovieSummary.fromJson);

        return summary;
    }
}