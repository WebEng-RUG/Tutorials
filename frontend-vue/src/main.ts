import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

// Here we are binding the pinia modules we have created to our Vue app. 
app.use(createPinia());

// Here we are binding the router we have created to our Vue app. 
app.use(router);

// This line mounts the entire vue js application onto the div with the if `app` on in the index.html file. 
// The vue js code will dynamically update the contents of this div in order to render the application.
app.mount("#app");
