<template>
  <nav class="d-flex justify-content-center mt-2">
    <ul class="pagination">
      <li class="page-item">
        <!-- When this button is clicked, it emits the `prev` event. -->
        <!-- If the `page` value from the prop is 0, the class 'disabled' is added to the button. This deactivates the button. -->
        <button :class="{ disabled: page === 0 }" class="page-link" href="#" aria-label="Previous" @click="$emit('prev')">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item">
        <div class="page-link disabled">{{ page + 1 }}</div>
      </li>

      <li class="page-item">
        <!-- When this button is clicked, it emits the `next` event. -->
        <button :class="{ disabled: currentPageElementCount < itemsPerPage }" class="page-link" href="#" aria-label="Next" @click="$emit('next')">
          <span aria-hidden="true">&raquo;</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Paginate",

  // Defining props that can/must be passed to the component. These are passed using a v-bind from the parent component.
  props: {
    page: {
      type: Number,
      required: true,
    },
    currentPageElementCount: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
  },

  // Defines the events that can be emitted by this component. These must be handled in the parent component using v-on or @ (these 2 are the same thing).
  emits: ["prev", "next"],
});
</script>

<style></style>
