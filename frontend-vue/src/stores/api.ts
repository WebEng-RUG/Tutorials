import { defineStore } from "pinia";

// get the list of backends, this is an environment variable reference that will be
// substituted by nginx at runtime when running in Docker.
let backends = "${BACKENDS}".split(",");

// if we're not running in Docker, then read from an environment variable directly
if(backends.length >= 1 && backends[0].startsWith("${"))
  backends = import.meta.env.VITE_BACKENDS?.split(",") ?? [];

/**
 * This is a store that holds the api selection information for the app.
 * This allows the selected api to be consistent throughout the app.
 */
export const useAPIStore = defineStore({
  id: "api",
  state: () => ({
    availableUrls: backends,
    apiBaseUrl: backends[0],
  }),
  actions: {
    updateApiUrl(url: string) {
      // Check that the selected url is in the available urls
      if (this.availableUrls.includes(url)) {
        this.apiBaseUrl = url;
      }
    },
  },
});
