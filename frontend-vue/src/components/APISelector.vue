<template>
  <div>
    <!-- When the value of the select changes, the @change event is calls the updateApiUrl method.
      This then updates the chosen backend url in the Pinia store. -->
    <select :value="apiStore.apiBaseUrl" class="form-select" @change="updateApiUrl($event)">
      <option v-for="url in apiStore.availableUrls" :key="url" :value="url">
        {{ url }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { useAPIStore } from "@/stores/api";
import { mapStores } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
  name: "APISelector",

  // Maps the api store to the component. 
  // All data in the store is available in the `apiStore` object.
  computed: {
    ...mapStores(useAPIStore),
  },

  // Defining all of the methods that will be callable within this component.
  methods: {
    updateApiUrl(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      // Using the updateApiUrl method from the API store      
      this.apiStore.updateApiUrl(value);
    },
  },
});
</script>

<style></style>
