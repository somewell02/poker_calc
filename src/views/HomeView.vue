<template>
  <div class="home">
    <bordered-select v-model="select" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BorderedSelect from "@/components/dropdowns/BorderedSelect.vue";

const select = ref("");
const options = [{ id: "1", title: "one" }, { id: "2" }];
</script>
