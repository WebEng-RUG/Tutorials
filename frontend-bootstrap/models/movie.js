import ActorSummary from "./actor-summary.js";

export class Review {
    /** @type {number?} */
    user;

    /** @type {number} */
    userCount;

    /** @type {number} */
    metaScore;

    /**
     * Convert from JSON to Review instance
     * @param {object} json JSON from API
     * @returns {Review}
     */
    static fromJson(json) {
        return Object.assign(new Review(), json);
    }
}

export default class Movie {
    /** @type {number} */
    id;

    /** @type {string} */
    title;

    /** @type {string?} */
    description;

    /** @type {number?} */
    year;

    /** @type {string?} */
    rating;

    /** @type {Review} */
    review;

    /** @type {string[]} */
    languages = [];

    /** @type {ActorSummary[]} */
    actors = [];

    /** @type {string} */
    imdb_url;

    /**
     * Converts from JSON to Movie instance
     * @param {object} json JSON from API
     * @returns {Movie}
     */
    static fromJson(json) {
        let movie = new Movie();
        movie.id = json.id;
        movie.title = json.title;
        movie.description = json.description;
        movie.year = json.year;
        movie.rating = json.rating;
        movie.review = Review.fromJson(json.review);
        movie.languages = json.languages;
        movie.actors = json.actors.map(ActorSummary.fromJson);
        movie.imdb_url = json.imdb_url;

        return movie;
    }
}