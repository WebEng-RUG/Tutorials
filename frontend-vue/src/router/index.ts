import { createRouter, createWebHistory } from "vue-router";
import MoviesListView from "@/views/MoviesListView.vue";
import MovieDetailsView from "@/views/MovieDetailsView.vue";
import ActorsListView from "@/views/ActorsListView.vue";
import ActorDetailsView from "@/views/ActorDetailsView.vue";
import MovieFormView from "@/views/MovieFormView.vue";

// More information about Vue Router: https://router.vuejs.org/guide/

const router = createRouter({
  /**
   * Definition of all the routes, and the components that should be rendered in the router view in the `App.vue` file.
   *
   */
  routes: [
    // Redirecting the user to the movies list route.
    { name: "Home", path: "", redirect: "/movies" },
    {
      path: "/movies",
      name: "MoviesList",
      component: MoviesListView,
    },
    {
      // Here a url parameter `id` is being defined. This can be accessed in `MovieDetailsView` with `this.$route.params.id`.
      // URL params are defined using the `:` symbol.
      path: "/movies/:id",
      name: "MovieDetails",
      component: MovieDetailsView,
    },
    {
      path: "/movies/create",
      name: "MovieCreate",
      component: MovieFormView,
      // Use meta to store extra information about this route. This can be accessed using the $route.meta object in component.
    },
    {
      path: "/actors",
      name: "ActorsList",
      component: ActorsListView,
    },
    {
      path: "/actors/:id",
      name: "ActorDetails",
      component: ActorDetailsView,
    },
  ],
  // This allows you to use methods such as `this.$router.go(-1)` to go back, as the router is storing all the previous routes that the user visited.
  history: createWebHistory(),
});

// Contents of this arrow function are run before each route navigation is executed. Here you can perform checks to ensure that the user is allowed to access this route for example.
router.beforeEach((to, from, next) => {
  next();
});

export default router;
