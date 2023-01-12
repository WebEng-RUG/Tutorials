<template>
  <div class="container-md">
    <div class="card card-body">
      <!-- Use details header component to standardise the header section on all details pages. -->
      <DetailsHeader :title="movie.title" v-if="movie.title">
        <!-- Demonstration of using slots in component. -->
        <small class="text-muted">{{ movie.year }}</small>
        <template #buttons>
          <!-- # is shorthand for v-slot. https://vuejs.org/guide/components/slots.html#named-slots-->
          <a class="btn btn-warning mx-1 float-end" :href="movie.imdb_url">View on IMDB</a>
        </template>
      </DetailsHeader>

      <hr />
      <p>{{ movie.description }}</p>
      <p><strong>Age Rating:</strong> {{ movie.rating }}</p>
      <div class="row">
        <!-- List of actors in movie -->
        <div class="col-md">
          <h3>Actors</h3>
          <ul style="list-style: none">
            <!-- This loops through the list of actors in the movie and creates an `li` element for each. The `actor` object can be accessed within to display it's information. -->
            <li v-for="(actor, index) in movie.actors" :key="index">
              <!-- A router link looks like an `a` tag, but you pass it details for the vue router route that you wish to navigate to.
              In this case, it will navigate to the named route `ActorDetails` when clicked. This route requires the `id` parameter, so that is provided.  -->
              <router-link :to="{ name: 'ActorDetails', params: { id: actor.id } }">{{ actor.name }}</router-link>
            </li>
          </ul>
        </div>

        <!-- Ratings and languages for movies. -->
        <div class="col-md">
          <div v-if="movie.review">
            <h3>Rating</h3>
            <ul style="list-style: none">
              <li><strong>Score:</strong> {{ movie.review.metaScore }}</li>
            </ul>
          </div>
          <h3>Languages</h3>
          <ul style="list-style: none">
            <!-- This loops through the list of languages and creates an `li` element for each. The `language` object can be accessed within to display it's information. -->
            <li v-for="language in movie.languages" :key="language">{{ language }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAPIStore } from "@/stores/api";
import { mapStores } from "pinia";
import { defineComponent } from "vue";
import { getMovie } from "@/api/movies.api";
import type Movie from "@/models/movie.model";
import DetailsHeader from "@/components/DetailsHeader.vue";

/**
 * A view for displaying details for a movie.
 */
export default defineComponent({
  name: "MovieDetailsView",
  // Defining all the components that will be used in the template.
  components: {
    DetailsHeader,
  },
  // Defining all of the variables that will be used throughout this component.
  data() {
    return {
      movie: {} as Movie,
      error: false as boolean,
    };
  },
  computed: {
    // Mapping the API store to allow all of the data in the API store to be accessible within this vue component.
    ...mapStores(useAPIStore),
  },
  // Method runs on the instantiation of the component in the DOM.
  async mounted() {
    if (typeof this.$route.params.id == "string") {
      // Getting the currently selected API url from the apiStore, and passing it the the getMovie method to retrieve the movie's data.
      try {
        this.movie = await getMovie(this.apiStore.apiBaseUrl, parseInt(this.$route.params.id as string));
      } catch (error) {
        alert("There was an error when getting the actors.");
        console.error(error);
        this.error = true;
      }
    } else {
      alert("You must provide a movie id.");
    }
  },
});
</script>

<style></style>
