export default class MovieSummary {
    /** @type {number} */
    id;

    /** @type {string} */
    title;

    /** @type {number?} */
    year;

    /** @type {string?} */
    rating;

    /**
     * Convert JSON to MovieSummary instance
     * @param {object} json JSON
     * @returns {MovieSummary}
     */
    static fromJson(json) {
        return Object.assign(new MovieSummary(), json);
    }
}