<template>
  <div class="container">
    <h3>Add a movie:</h3>
    <MovieForm @submit="$router.push({ name: 'MoviesList' })" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MovieForm from "@/components/movies/MovieForm.vue";

/**
 * A view for displaying the movie form for creating a new movie.
 */
export default defineComponent({
  name: "MovieFormView",
  components: {
    MovieForm,
  },
});
</script>

<style></style>
