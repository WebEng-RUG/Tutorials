<template>
  <div class="card card-body m-1">
    <h2 class="clickable" @click="$router.push({ name: 'MovieDetails', params: { id: movie.id } })">{{ movie.title }}</h2>
    <small class="text-muted">{{ movie.year }}</small>
    <a class="link-danger clickable" @click="deleteMovie">Delete Movie</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { MovieSummary } from "@/models/movie-summary.model";
import { mapStores } from "pinia";
import { deleteMovie } from "@/api/movies.api";
import { useAPIStore } from "@/stores/api";

/**
 * Component for displaying a movies details in a list.
 * Takes a list of Movie Summary as a prop to render .
 */
export default defineComponent({
  name: "MovieCard",
  computed: {
    ...mapStores(useAPIStore),
  },
  props: {
    movie: {
      type: Object as PropType<MovieSummary>,
      required: true,
    },
  },

  // Defining all of the methods that will be callable within this component.
  methods: {
    async deleteMovie() {
      // Using the html alert to confirm with the user that they want to delete this item.
      const ok = confirm(`Are you sure you want to delete ${this.movie.title}?`);

      if (ok) {
        try {
          await deleteMovie(this.apiStore.apiBaseUrl, this.movie.id);
        } catch (error) {
          alert("Unable to delete movie: " + error);
        }
        alert(`${this.movie.title} has been deleted!`);
      } else {
        alert("Movie deletion cancelled.");
      }

      // Emit reload to the parent so that it can reload the movies to reflect the deletion.
      this.$emit("reload");
    },
  },
});
</script>

<style></style>
