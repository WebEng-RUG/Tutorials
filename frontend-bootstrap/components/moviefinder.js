import movies from "../api/movies.js";
import ApiMovieSummary from "../models/movie-summary.js";
import MovieSummary from "./movie-summary.js";

// This is a custom Event to represent a movie being selected,
// carrying a movieId field with it to represent which movie is
// being selected. This is used in the MovieFinder element, to
// inform the rest of the application that the user selected a movie.
export class MovieSelectedEvent extends Event {
    /** @type {number} */
    movieId;

    /**
     * @param {number} movieId 
     */
    constructor(movieId) {
        // We call the parent constructor with a string representing
        // the name of this event. This is what we listen to.
        super("movie-selected");

        this.movieId = movieId;
    }
}

// This is a custom element representing a movie finder as a whole.
// It contains a small form where the user can enter a title and year
// to search for, and will show all matching results with pagination.
// The user can pick any of the results, after which the element will
// emit a "movie-selected" event as defined above.
export default class MovieFinder extends HTMLElement {
    /** @type {HTMLInputElement} */ #titleSearch;
    /** @type {HTMLInputElement} */ #yearSearch;
    /** @type {HTMLButtonElement} */ #find;
    /** @type {HTMLDivElement} */ #results;
    /** @type {HTMLButtonElement} */ #navNext;
    /** @type {HTMLButtonElement} */ #navPrev;

    // Below here, we have some local state of this element instance
    /** @type {number} */ #currentOffset = 0;
    /** @type {boolean} */ #hasResults = false;

    constructor() {
        // Always call the parent constructor!
        super();

        // We start by finding the template and taking its contents.
        const template = document.getElementById("movie-finder");
        const templateContent = template.content;

        // Prepare shadow DOM and fill it with the template contents
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        // Find elements inside the templates and cache them for
        // future reference.
        this.#titleSearch = this.shadowRoot.getElementById("title");
        this.#yearSearch = this.shadowRoot.getElementById("year");
        this.#find = this.shadowRoot.getElementById("find");
        this.#results = this.shadowRoot.getElementById("movies");
        this.#navNext = this.shadowRoot.getElementById("page-next");
        this.#navPrev = this.shadowRoot.getElementById("page-prev");

        // Update the view to reflect the internal state.
        this.updateView();

        // Set up listeners to start search operation after every form
        // action.
        this.#find.addEventListener("click", async () => {
            this.#currentOffset = 0; // when we have a fresh search query, we
            // always want to start at the first page
            await this.search();
        });

        this.#navNext.addEventListener("click", async () => {
            this.#currentOffset += 10; // go to next page
            await this.search();
        });

        this.#navPrev.addEventListener("click", async () => {
            this.#currentOffset -= 10; // go to previous page if any
            if (this.#currentOffset < 0) this.#currentOffset = 0;
            await this.search();
        });
    }

    // This function will make sure the view (DOM) state is consistent at all
    // times. It will take the internal state of the element and make sure the
    // DOM reflects this state. This is better than modifying the DOM from multiple
    // places, as that might become error-prone when dealing with more complicated
    // object lifecycles. You might forget to hide something in a very specific edge-case.
    // This setup allows you to properly test a single function and then all the
    // view logic is in a single place: much better software architecture.
    updateView() {
        if (!this.#hasResults || this.#currentOffset === 0) this.#navPrev.classList.add("disabled");
        else this.#navPrev.classList.remove("disabled");

        if (!this.#hasResults) this.#navNext.classList.add("disabled");
        else this.#navNext.classList.remove("disabled");
    }

    // This function will start a "getMovies" operation from the API. It will take the
    // local form state and get the appropriate results.
    async search() {
        let title = this.#titleSearch.value;
        let year = this.#yearSearch.value;

        /** @type {ApiMovieSummary[]} */
        let movieResult;
        try {
            movieResult = await movies.getMovies(title, year, 10, this.#currentOffset);
        } catch (e) {
            alert(e);
            return;
        }

        // Clear old rendered results only after we received a new set of results, so
        // the front-end is always in a usable state.
        this.#results.innerHTML = "";
        this.#hasResults = false;

        // Build the new view: we instantiate a MovieSummary custom element for every
        // result, and create two spans that connect to the two slots in MovieSummary's
        // template.
        for (let movie of movieResult) {
            // Create a new summary instance and set its ID (for later reference)
            let movieView = new MovieSummary();
            movieView.movieId = movie.id;

            // Connect slots: this is done by creating two spans (can be arbitrary elements)
            // with the "slot" attribute set to match the slot name. We then put these two
            // spans inside the custom element as if they were child nodes - this is where
            // the shadow DOM will pull the slot values from. They are never displayed like
            // this directly, so the order or structure does not matter.
            let titleSpan = document.createElement("span");
            titleSpan.slot = "title";
            titleSpan.innerText = movie.title;

            let yearSpan = document.createElement("span");
            yearSpan.slot = "year";
            yearSpan.innerText = movie.year;

            let subSpan = document.createElement("span");
            subSpan.slot = "subtitle";
            subSpan.innerText = `${movie.year} - ${movie.rating}`;

            let ratingSpan = document.createElement("span");
            ratingSpan.slot = "rating";
            ratingSpan.classList.add("badge");
            ratingSpan.innerText = movie.rating;

            switch (movie.rating) {
                case 'G':
                    ratingSpan.classList.add("bg-success");
                    break;
                case 'PG':
                    ratingSpan.classList.add("bg-warning");
                    break;
                case 'PG-13':
                    ratingSpan.classList.add("bg-primary");
                    break;
                case 'R':
                    ratingSpan.classList.add("bg-danger");
                    break;
                case '18':
                    ratingSpan.classList.add("bg-dark");
                    break;
                default:
                    ratingSpan.classList.add("bg-secondary");
                    break;
            }

            movieView.appendChild(titleSpan);
            movieView.appendChild(yearSpan);
            movieView.appendChild(ratingSpan);

            // Add an event listener: we want to trigger a "movie-selected" event when
            // the user clicks a specific movie.
            movieView.addEventListener("click", () => {
                this.dispatchEvent(new MovieSelectedEvent(movieView.movieId));
            });

            this.#results.appendChild(movieView);
            this.#hasResults = true; // after adding a single result, we certainly have them
        }

        // Make sure the form is in a consistent state.
        this.updateView();
    }
};

// Define the MovieFinder class as a custom element
window.customElements.define('movie-finder', MovieFinder);