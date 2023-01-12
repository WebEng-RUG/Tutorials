<template>
  <div class="container-md">
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <div class="card card-body" v-else>
      <!-- Use details header component to standardise the header section on all details pages. -->
      <DetailsHeader :title="actor.name" v-if="actor.name"></DetailsHeader>
      <hr />
      <h3>Movies:</h3>
      <!-- Movie list is only displayed if the actor.movies.length > 0 -->
      <MoviesList v-if="actor.movies" :movies="actor.movies"></MoviesList>
    </div>
  </div>
</template>

<script lang="ts">
import { useAPIStore } from "@/stores/api";
import { mapStores } from "pinia";
import { defineComponent } from "vue";
import { getActor } from "@/api/actors.api";
import type Actor from "@/models/actor.model";
import MoviesList from "@/components/movies/MoviesList.vue";
import DetailsHeader from "@/components/DetailsHeader.vue";

/**
 * View for displaying information about a particular actor.
 *
 * Needs router parameter: id
 */
export default defineComponent({
  name: "ActorDetails",
  // Defining all the components that will be used in the template.
  components: { MoviesList, DetailsHeader },
  // Defining all of the variables that will be used throughout this component.
  data() {
    return {
      actor: {} as Actor,
      error: "" as string,
    };
  },
  computed: {
    ...mapStores(useAPIStore),
  },
  // Method runs on the instantiation of the component in the DOM.
  async mounted() {
    if (typeof this.$route.params.id == "string") {
      try {
        // Get the actor data from the API. Using method from `actors.api.ts`
        this.actor = await getActor(this.apiStore.apiBaseUrl, parseInt(this.$route.params.id as string));
      } catch (err) {
        this.error = "Couldn't get the actor data: " + err;
      }
    } else {
      this.error = "You must provide an id for the actor.";
    }
  },
});
</script>

<style></style>
