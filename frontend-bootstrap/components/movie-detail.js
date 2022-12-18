import movies from "../api/movies.js";
import Movie from "../models/movie.js";

// Custom Element for a detailed movie view.
// We designed this element to be "reusable" for many different
// movies, instead of recreating an instance for every new movie
// we want to show the details of.
//
// The current movie ID is stored as an attribute on the element itself,
// we monitor any changes of this ID. When it changes, we recreate the
// view (contents) of this element to reflect the new movie ID.
// So either we clear the contents, or we get new details from the API
// and rebuild the structure.
export default class MovieDetail extends HTMLElement {
    /** @type {HTMLTemplateElement} */ #template;

    /** @type {HTMLElement} */ #title;
    /** @type {HTMLElement} */ #description;
    /** @type {HTMLElement} */ #year;
    /** @type {HTMLElement} */ #rating;
    /** @type {HTMLElement} */ #languages;
    /** @type {HTMLElement} */ #actors;
    /** @type {HTMLAnchorElement} */ #url;

    // We expose the attribute "movie-id" also as a property on the
    // class instance, so if we find an instance of "MovieDetail", we can
    // call detail.movieId = x to store a new ID. A property is essentially
    // a get/set combination that is accessible as if it was a normal field.
    get movieId() {
        return this.getAttribute("movie-id");
    }

    set movieId(value) {
        if(value == null)
            this.removeAttribute("movie-id");
        else
            this.setAttribute("movie-id", value);
    }

    // This indicated to the browser that we want to be notified of any changes
    // to the attribute "movie-id". The browser will then call "attributeChangedCallback"
    // for us. This will also be called when someone sets a new value to the property
    // above, since that set operation is translated into setting a new attribute
    // value.
    static get observedAttributes() {
        return ["movie-id"];
    }

    constructor() {
        // Always call the parent constructor!
        super();

        this.#template = document.getElementById("movie-detail");
        this.attachShadow({ mode: "open" });

        this.initializeTemplate();
    }

    // We extract cloning the template and setting the HTML references into its own function
    // instead of doing this in the constructor as we typically do. This allows us to
    // completely refresh our contents when loading a new movie, instead of clearing all
    // fields separately.
    initializeTemplate() {
        this.shadowRoot.innerHTML = "";
        this.shadowRoot.appendChild(this.#template.content.cloneNode(true));

        this.#title = this.shadowRoot.getElementById("title");
        this.#description = this.shadowRoot.getElementById("desc");
        this.#year = this.shadowRoot.getElementById("year");
        this.#rating = this.shadowRoot.getElementById("rating");
        this.#languages = this.shadowRoot.getElementById("langs");
        this.#actors = this.shadowRoot.getElementById("actors");
        this.#url = this.shadowRoot.getElementById("url");
    }

    // The browser will call this function when the "movie-id" attribute changes.
    async attributeChangedCallback() {
        // If we no longer have any value set, we clear the details view
        if(!this.movieId) {
            this.shadowRoot.innerHTML = "";
            return;
        }

        // Otherwise, we will obtain the details of the new movie from the API
        /** @type {Movie} */
        let movie;
        try {
            movie = await movies.getMovie(this.movieId);
        } catch(e) {
            alert(e);
            return;
        }

        // When we have the results, we recreate the details view and set all
        // properties.
        this.initializeTemplate();

        switch (movie.rating) {
            case 'G':
                this.#rating.classList.add("bg-success");
                break;
            case 'PG':
                this.#rating.classList.add("bg-warning");
                break;
            case 'PG-13':
                this.#rating.classList.add("bg-primary");
                break;
            case 'R':
                this.#rating.classList.add("bg-danger");
                break;
            case '18':
                this.#rating.classList.add("bg-dark");
                break;
            default:
                this.#rating.classList.add("bg-secondary");
                break;
        }

        this.#title.innerText = movie.title;
        this.#description.innerText = movie.description;
        this.#year.innerText = movie.year;
        this.#rating.innerText = movie.rating;
        this.#languages.innerText = movie.languages.join(", ");
        
        for (let actor of movie.actors){
            let actorBadge = document.createElement("span");
            actorBadge.classList.add("badge");
            actorBadge.classList.add("me-2");
            actorBadge.classList.add("bg-secondary");
            actorBadge.innerText = actor.name;
            this.#actors.appendChild(actorBadge);
        }

        this.#url.href = movie.imdb_url;
    }
};

// Define the MovieDetail class as a custom element.
window.customElements.define("movie-detail", MovieDetail);