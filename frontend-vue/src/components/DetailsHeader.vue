<template>
  <div class="row">
    <div class="col">
      <h2>{{ title }}</h2>
      <!-- @slot default slot -->
      <!-- A slot allows us to pass custom code html from the parent component. This allows us to use a component in custom ways in different places. -->
      <!-- The use of this slot can be seen in the `ActorDetailsView` and `MovieDetailsView` -->
      <slot></slot>
    </div>
    <div class="col">
      <button class="btn btn-danger mx-1 float-end" @click="$router.go(-1)">Back</button>
      <!-- @slot buttons - for adding buttons next to the back button -->
      <!-- This slot is named, so will only be filled when a named slot template is used in the parent.  -->
      <!-- Use of this named slot can be seen in the `MovieDetailsView` -->
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * A component that standardizes the header section of a details view. Eg. MovieDetailsView
 */
export default defineComponent({
  name: "DetailsHeader",

  // Defining props that can/must be passed to the component. These are passed using a v-bind from the parent component.
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style></style>
