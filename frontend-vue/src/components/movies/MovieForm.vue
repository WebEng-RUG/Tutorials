<template>
  <!-- @submit.prevent triggers the specified method on submit  -->
  <!-- The prevent stops the form from doing the default html action, such as performing a GET request. -->
  <form @submit.prevent="submitForm">
    <!-- Movie Title Input -->
    <div class="mb-3">
      <label for="movieTitleInput" class="form-label">Title</label>
      <input v-model="movie.title" type="text" class="form-control" id="movieTitleInput" required />
    </div>
    <!-- movie Description Input -->
    <div class="mb-3">
      <label for="movieDescriptionInput" class="form-label">Description</label>
      <textarea v-model="movie.description" class="form-control" id="movieDescriptionInput" />
    </div>

    <!-- Movie Year Input -->
    <div class="mb-3">
      <label for="movieYearInput" class="form-label">Release Year</label>
      <input type="number" v-model="movie.year" class="form-control" id="movieYearInput" required />
    </div>
    <hr />

    <!-- Movie Languages Inline Formset -->
    <h5>Languages:</h5>
    <!-- This v-for will render as many rows as there are strings in the languages array. -->
    <!-- If an index is removed or an element added, this v-for will dynamically update to reflect the change. -->
    <div class="row mb-3" v-for="(language, index) in movie.languages">
      <div class="col">
        <input type="string" v-model="movie.languages[index]" class="form-control" id="movieYearInput" required />
      </div>
      <div class="col-auto d-flex align-items-end">
        <button class="btn btn-danger mx-1" @click="removeLanguageRow(index)"><strong>Remove</strong></button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click="addLanguageRow()"><strong>Add Language</strong></button>
      </div>
    </div>
    <hr />

    <!-- Movie Actors Inline Formset -->
    <h5>Actors:</h5>
    <div class="row mb-3" v-for="(language, index) in movie.actors">
      <div class="col">
        <input type="string" v-model="movie.actors[index].name" class="form-control" id="movieYearInput" required />
      </div>
      <div class="col-auto d-flex align-items-end">
        <button class="btn btn-danger mx-1" @click="removeActorRow(index)"><strong>Remove</strong></button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-primary" @click="addActorRow()"><strong>Add Actor</strong></button>
      </div>
    </div>
    <hr />

    <!-- Movie IMDB URL Input -->
    <div class="mb-3">
      <label for="movieImdbUrlInput" class="form-label">IMDB URL:</label>
      <input type="text" v-model="movie.imdb_url" class="form-control" id="movieImdbUrlInput" required />
    </div>

    <div class="alert alert-danger" v-show="errorMessage">
      {{ errorMessage }}
    </div>

    <!-- Since the type is submit, it will trigger the form's submit event -->
    <div class="row">
      <div class="col d-grid"><button type="submit" class="btn btn-primary">Submit</button></div>
    </div>
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useAPIStore } from "@/stores/api";
import type FormMovie from "@/models/movie-from.models";
import { createMovie } from "@/api/movies.api";

/**
 * A form for creating a new movie.
 */
export default defineComponent({
  name: "MovieForm",
  emits: ["submit"],
  data() {
    return {
      errorMessage: "" as string,
      // Defining the movie object that is used for the v-models.
      movie: { title: "", description: "", year: 2023, rating: "", languages: [""], actors: [{ name: "" }], imdb_url: "" } as FormMovie,
    };
  },

  computed: {
    ...mapStores(useAPIStore),
  },

  // Defining all of the methods that will be callable within this component.
  methods: {
    removeLanguageRow(index: number) {
      this.movie.languages.splice(index, 1);
    },
    // Adds a row to the languages inline form by adding an empty string to the langauges list.
    // Since the v-for updates dynamically as the array changes this will be reflected in the template.
    addLanguageRow() {
      this.movie.languages.push("");
    },
    removeActorRow(index: number) {
      this.movie.actors.splice(index, 1);
    },
    addActorRow() {
      this.movie.actors.push({ name: "" });
    },
    /**
     * Submitting the form data to the api to create the movie.
     * Has some basic validation of the data.
     */
    submitForm() {
      if (!this.movie.imdb_url.includes("http")) {
        this.errorMessage = "Please enter a valid URL. Must contain http:// or https://";
        return;
      }

      createMovie(this.apiStore.apiBaseUrl, this.movie)
        .then(() => this.$emit("submit"))
        .catch((error) => (this.errorMessage = error.message));
    },
  },
});
</script>

<style></style>
