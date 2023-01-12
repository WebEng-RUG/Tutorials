<template>
  <div class="card card-body m-1">
    <h2>{{ actor.name }}</h2>
  </div>
</template>

<script lang="ts">
import type ActorSummary from "@/models/actor-summary.model";
import { defineComponent, type PropType } from "vue";

/**
 * A basic card component for displaying the details for an actor in a list.
 */
export default defineComponent({
  name: "ActorCard",
  props: {
    actor: {
      type: Object as PropType<ActorSummary>,
      required: true,
    },
  },
});
</script>

<style></style>
