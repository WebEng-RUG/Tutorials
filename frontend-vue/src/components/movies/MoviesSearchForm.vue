<template>
  <form @submit.prevent="submitForm" class="mt-2 card card-body">
    <div class="row">
      <div class="col-md row">
        <div class="col mb-3">
          <label for="title-entry" class="form-label">Title</label>
          <input type="text" v-model="form.title" class="form-control" id="title-entry" placeholder="(Empty for all)" />
        </div>
        <div class="col mb-3">
          <label for="year-entry" class="form-label">Year</label>
          <input type="number" v-model="form.year" class="form-control" id="year-entry" placeholder="(Empty for all)" />
        </div>
      </div>
      <div class="col-md row">
        <div class="col mb-3">
          <label for="order_by" class="form-label">Order By:</label>
          <select id="order_by" v-model="form.order_by" class="form-control">
            <option disabled value="">Choose...</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div class="col mb-3">
          <label for="order_dir" class="form-label">Order Direction:</label>
          <select id="order_dir" v-model="form.order_dir" class="form-control" :disabled="!form.order_by">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export interface FormData {
  title: string;
  year: number | null;
  order_by: "title" | "year" | "rating" | "";
  order_dir: "asc" | "desc";
}

export default defineComponent({
  name: "MoviesSearchForm",
  data() {
    return {
      form: {
        title: "",
        year: null,
        order_by: "",
        order_dir: "asc",
      } as FormData,
    };
  },
  emits: {
    submitForm(payload: FormData) {
      return true;
    },
  },

  // Defining all of the methods that will be callable within this component.
  methods: {
    submitForm() {
      this.$emit("submitForm", this.form);
    },
  },
});
</script>

<style></style>
