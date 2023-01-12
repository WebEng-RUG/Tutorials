<template>
  <!-- Here the List component is being used to render the list of movies. The movie card is being passed into the default slot of the List component. 
    The item is being dereferenced from the slot and passed to the MovieCard component.  -->
  <List :items="movies" v-slot="{ item }">
    <!-- Renders the details about a movie object that is passed to it . -->
    <!-- When the reload event is received from the movies card, it is emitted again to the parent of the MoviesList comonent -->
    <MovieCard :movie="item" @reload="$emit('reload')" />
  </List>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import MovieCard from "./MovieCard.vue";
import type { MovieSummary } from "@/models/movie-summary.model";
import List from "@/components/List.vue";

export default defineComponent({
  name: "MoviesList",
  props: {
    movies: {
      type: Array as PropType<MovieSummary[]>,
      required: true,
    },
  },
  components: {
    MovieCard,
    List,
  },
});
</script>
