<template>
  <List :items="actors" v-slot="{ item }">
    <ActorCard class="clickable" :actor="item" @click="$router.push({ name: 'ActorDetails', params: { id: item.id } })" />
  </List>
</template>

<script lang="ts">
import type ActorSummary from "@/models/actor-summary.model";
import { defineComponent, type PropType } from "vue";
import ActorCard from "./ActorCard.vue";
import List from "../List.vue";

/**
 * A component for rendering a list of ActorSummary objects.
 */
export default defineComponent({
  name: "ActorsList",
  props: {
    actors: {
      type: Array as PropType<ActorSummary[]>,
      required: true,
    },
  },
  // Defining all the components that will be used in the template.
  components: {
    ActorCard,
    List,
  },
});
</script>
