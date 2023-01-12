<template>
  <nav class="navbar navbar-expand bg-dark mb-2">
    <div class="container-fluid">
      <div class="" id="navbarNavAltMarkup">
        <ul class="navbar-nav">
          <li class="nav-item">
            <!-- A router link looks like an `a` tag, but you pass it details for the vue router route that you wish to navigate to.
              In this case, it will navigate to the named route `MoviesList` when clicked.  -->
            <router-link :to="{ name: 'MoviesList' }" class="nav-link active text-light" aria-current="page" href="#">Movies</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'ActorsList' }" class="nav-link active text-light" aria-current="page" href="#">Actors</router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- The API selector component allows the user to select which backend api they want to use. -->
    <APISelector></APISelector>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import APISelector from "@/components/APISelector.vue";
import { mapState } from "pinia";

export default defineComponent({
  // Defining all the components that will be used in the template.
  components: { APISelector },
});
</script>

<style></style>
