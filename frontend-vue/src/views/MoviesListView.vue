<template>
  <div class="container-md">
    <p>
      Welcome to the Vue Frontend for the Movies API. This frontend makes use of the most important details of the Vue framework to give you an idea of how it works. I have used Bootstrap in order to spruce up the look and feel of the site, but
      please don't pay too much attention to this.
    </p>
  </div>
  <div class="container-md">
    <div class="row">
      <div class="col">
        <h1>Find Movies!</h1>
      </div>
      <div class="col">
        <!-- If the user is not logged in, then the link button is disabled. -->
        <router-link :to="{ name: 'MovieCreate' }" class="btn btn-info float-end mt-1">Add a movie</router-link>
      </div>
    </div>
    <!-- The movie filter form is a component. When it is submitted it emits the `submitForm` event, triggering the applyFilter method -->
    <MoviesSearchForm @submitForm="applyFilter" class="mb-2"></MoviesSearchForm>

    <div class="alert alert-danger" role="alert" v-if="error">
      {{ error }}
    </div>
    <div v-if="!error && movies.length">
      <MoviesList :movies="movies" @reload="loadMovies"></MoviesList>
      <!-- Paginate component has the buttons for next and prev page for pagination. -->
      <Paginate :page="searchParams.offset / moviesPerPage" :currentPageElementCount="movies.length" :itemsPerPage="moviesPerPage" @next="nextPage" @prev="prevPage"></Paginate>
    </div>
    <div v-if="!movies.length">No movies to show...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoviesSearchForm from "@/components/movies/MoviesSearchForm.vue";
import { getMovies } from "@/api/movies.api";
import type { MovieFilterParams } from "@/api/movies.api";
import Paginate from "@/components/Paginate.vue";
import { useAPIStore } from "@/stores/api";
import { mapState, mapStores } from "pinia";
import type { FormData } from "@/components/movies/MoviesSearchForm.vue";
import MoviesList from "@/components/movies/MoviesList.vue";
import type { MovieSummary } from "@/models/movie-summary.model";

/**
 * View for displaying the list of movies.
 *
 * This component uses the `MovieList` component to display the list of movie. This might seem unnecessary,
 * but the `MovieList` component is a reusable component that will display any list of `MovieSummary` objects.
 * The logic for creating/getting the list of movies is definied in this component.
 */
export default defineComponent({
  name: "MoviesListView",

  // Defining all the components that will be used in the template.
  components: {
    MoviesSearchForm,
    MoviesList,
    Paginate,
  },

  computed: {
    // Mapping the API store to allow all of the data in the API store to be accessible within this vue component.
    ...mapStores(useAPIStore),
  },

  // Defining all of the variables that will be used throughout this component.
  data() {
    return {
      movies: [] as MovieSummary[],
      moviesPerPage: 10,

      // Error message to be displayed in alert.
      error: "" as string,
      searchParams: {} as MovieFilterParams,
    };
  },
  // Method runs on the instantiation of the component in the DOM.
  mounted() {
    // Sets the default movie search parameters.
    this.searchParams = {
      title: "",
      year: null,
      limit: this.moviesPerPage,
      offset: 0,
      order_by: "",
      order_dir: "asc",
    };
    // Loads the list of movies using default filters
    this.loadMovies();
  },

  // Defining all of the methods that will be callable within this component.
  methods: {
    // Applies the new filters from the form and gets the new list of movies.
    applyFilter(search: FormData) {
      this.searchParams = {
        title: search.title,
        year: search.year,
        limit: this.moviesPerPage,
        offset: 0,
        order_by: search.order_by,
        order_dir: search.order_dir,
      };

      this.loadMovies();
    },
    async loadMovies() {
      try {
        this.movies = await getMovies(this.apiStore.apiBaseUrl, this.searchParams);
      } catch (err) {
        alert("Unable to load the list of movies: " + err);
      }
    },
    nextPage() {
      this.searchParams.offset += this.moviesPerPage;
      this.loadMovies();
    },
    prevPage() {
      if (this.searchParams.offset >= this.moviesPerPage) {
        this.searchParams.offset -= this.moviesPerPage;
        this.loadMovies();
      }
    },
  },
});
</script>

<style scoped>
/* Scoped styles for this component.  */
.clickable {
  cursor: pointer;
}
</style>
