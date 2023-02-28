<template>
  <div class="app-wrap">
    <preloader-spinner />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import PreloaderSpinner from "@/components/popups/PreloaderSpinner.vue";
import { useMainStore } from "@/store/mainStore";

const mainStore = useMainStore();
mainStore.initData();
</script>
