import serverPreference from "../storage/server-preference.js";

// This is a custom element to offer the user the choice between
// the different back-end available to this application.
// The choice of the user is stored by the respective API.
export default class ServerPreference extends HTMLElement {
    /** @type {HTMLSelectElement} */
    #dropdown;

    /** @type {string} */
    #selection;

    /** @type {string[]} */
    #options;

    constructor() {
        // Always call the parent constructor!
        super();

        const template = document.getElementById("server-preference");
        const templateContent = template.content;

        // Prepare shadow DOM
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateContent.cloneNode(true));

        // Make local variables
        this.#dropdown = this.shadowRoot.getElementById("server-options");

        // We obtain the list of options and the stored selection
        this.#options = serverPreference.getServerOptions();
        this.#selection = serverPreference.getSelectedServer();

        // Then we build the dropdown list: we first add a "disabled" but
        // default option stating "Choose a server", and then add an option
        // element for each server option we obtained above.
        let optionElem = document.createElement("option");
        optionElem.value = "";
        optionElem.innerHTML = "Choose a server";
        optionElem.disabled = true;
        optionElem.selected = this.#selection === null;

        this.#dropdown.appendChild(optionElem);

        for(let option of this.#options) {
            optionElem = document.createElement("option");
            optionElem.value = option;
            optionElem.text = option;
            optionElem.selected = option === this.#selection;

            this.#dropdown.appendChild(optionElem);
        }

        // Set up listeners: when the user changes the value of the dropdown,
        // process this change
        this.#dropdown.addEventListener("change", this.changeServer.bind(this));
    }

    // Is called when the user changes the server selection. Will take the new value
    // and try to store it. If it is invalid, warns the user and restores the previously-
    // saved value.
    changeServer() {
        const server = this.#dropdown.value;
        try {
            serverPreference.setSelectedServer(server);
            this.#selection = this.#dropdown.value;
        } catch(e) {
            alert("Invalid server choice!");
            this.#dropdown.value = this.#selection;
        }
    }
};

// Define the ServerPreference class as a custom element.
window.customElements.define('server-preference', ServerPreference);