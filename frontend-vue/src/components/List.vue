<template>
  <div>
    <div v-if="items.length" class="row">
      <!-- This loops through the list of items and creates  slot in which the template defined in the parent is rendered for each element.-->
      <div class="col-6" v-for="(item, i) in items" :key="i">
        <!-- Here the `item` variable is being bound to the slot, and can be used in the parent component to define how each list element should be rendered -->
        <!-- For an example, please look at the `MoviesList` component -->
        <slot :item="item"></slot>
      </div>
    </div>
    <p v-else>No {{ item_name }} items to show...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/**
 * This component renders a list of items that are passed in. Makes use of the slot functionality.
 */
export default defineComponent({
  name: "List",
  props: {
    item_name: { type: String, default: "item" },
    items: {
      type: Array,
      required: true,
    },
  },
});
</script>
