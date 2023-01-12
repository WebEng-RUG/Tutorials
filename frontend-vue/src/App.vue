<template>
  <div>
    <!-- Using the NavBar component -->
    <NavBar></NavBar>
    <RouterView />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
  // Defining all the components that will be used in the template.
  components: { NavBar },
  // Method that is run when the `App.vue` component is instantiated. This is a lifecycle hook.
});
</script>