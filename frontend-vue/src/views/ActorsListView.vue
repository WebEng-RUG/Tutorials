<template>
  <div class="container-md">
    <h1>Actors</h1>
    <!-- List only renders if no error and the actors.length > 0 -->
    <div v-if="!error && actors.length">
      <!-- uses a v-bind to pass the `actors` array to the `ActorsList` component. -->
      <ActorsList :actors="actors"></ActorsList>
      <!-- Component that has the next page, previous page buttons. -->
      <!-- This component emits the `next` and `prev` events when the appropriate button is pressed. 
        This is the being bound with a v-on (shorthand @) to trigger the appropriate methods from this component  -->
      <Paginate :page="searchParams.offset / actorsPerPage" :currentPageElementCount="actors.length" :itemsPerPage="actorsPerPage" @next="nextPage" @prev="prevPage"></Paginate>
    </div>
    <div v-if="!actors.length">No actors to show...</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoviesSearchForm from "@/components/movies/MoviesSearchForm.vue";
import Paginate from "@/components/Paginate.vue";
import { useAPIStore } from "@/stores/api";
import { mapStores } from "pinia";
import ActorsList from "@/components/actors/ActorsList.vue";
import type ActorSummary from "@/models/actor-summary.model";
import { getActors, type ActorFilterParams } from "@/api/actors.api";

/**
 * View for displaying the list of actors.
 *
 * This component uses the actor list component to display the list of actors. This might seem unnecesary,
 * but the ActorList component is a reusable component that will display any list of ActorSummary objects.
 * This gives us a very reusable component that receives the list of actors from this view.
 */
export default defineComponent({
  name: "ActorsListView",
  // Defining all the components that will be used in the template.
  components: {
    MoviesSearchForm,
    ActorsList,
    Paginate,
  },

  computed: {
    // Mapping the API store to allow all of the data in the API store to be accessible within this vue component.
    ...mapStores(useAPIStore),
  },

  // Defining all of the variables that will be used throughout this component.
  data() {
    return {
      actors: [] as ActorSummary[],
      actorsPerPage: 20,
      searchParams: {} as ActorFilterParams,
      error: false,
    };
  },

  // Loads the initial list of actors with no filters when the component is mounted. Uses the `mounted` lifecycle hook.
  mounted() {
    this.searchParams = {
      limit: this.actorsPerPage,
      offset: 0,
    };
    this.loadActors();
  },

  // Defining all of the methods that will be callable within this component.
  methods: {
    applyFilter() {
      // At the moment this page doesn't have any filters, but I left this code in just incase filters want to be added later.
      this.searchParams = {
        limit: this.actorsPerPage,
        offset: 0,
      };

      this.loadActors();
    },
    async loadActors() {
      // Getting the currently selected API url from the apiStore, and passing it the the getActors method to retrieve the actors data.
      try {
        this.actors = await getActors(this.apiStore.apiBaseUrl, this.searchParams);
      } catch (error) {
        alert("There was an error when getting the actors.");
        console.error(error);
        this.error = true;
      }
    },
    // Gets the next page of actors from the api.
    nextPage() {
      this.searchParams.offset += this.actorsPerPage;
      this.loadActors();
    },
    // Gets the previous page of actors from the api.
    prevPage() {
      if (this.searchParams.offset >= this.actorsPerPage) {
        this.searchParams.offset -= this.actorsPerPage;
        this.loadActors();
      }
    },
  },
});
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
