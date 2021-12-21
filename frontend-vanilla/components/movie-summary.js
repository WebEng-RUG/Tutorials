// This is a very simple custom element to show the summary
// of a movie. A more "logical"/code-oriented way of designing
// this element would have been to pass an ApiMovieSummary instance
// to this class and let this custom element contain the
// logic for showing the right properties.
//
// However, this element was designed as an example of how to
// work with slots, so instead we move the view logic to the
// class *using* this custom element. The template for this
// element has two slots: title and subtitle. These can be filled
// by the user of this element. So really, this might have been
// better called "title/subtitle" or something along those lines.
export default class MovieSummary extends HTMLElement {
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

    constructor() {
        // Always call the parent constructor!
        super();

        const template = document.getElementById("movie-summary");
        const templateContent = template.content;

        // Prepare shadow DOM
        this.attachShadow({ mode: "open" });
        
        // This command will clone the template content and put it in the shadow DOM
        // root. It will automatically connect any slot values provided to this element.
        this.shadowRoot.appendChild(templateContent.cloneNode(true));
    }
};

// Define the MovieSummary class as a custom element
window.customElements.define("movie-summary", MovieSummary);