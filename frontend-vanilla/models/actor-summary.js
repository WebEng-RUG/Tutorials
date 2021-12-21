export default class ActorSummary {
    /** @type {number} */
    id;
    /** @type {string} */
    name;

    /**
     * Convert JSON to ActorSummary instance
     * @param {object} json API Response
     * @returns {ActorSummary}
     */
    static fromJson(json) {
        return Object.assign(new ActorSummary(), json);
    }
}