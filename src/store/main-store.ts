import { defineStore } from "pinia";
import { ref } from "vue";

export const useMainStore = defineStore("main-store", () => {
  const isLoading = ref<boolean>(true);

  const setLoading = (loading: boolean) => {
    isLoading.value = loading;
  };

  return { isLoading, setLoading };
});
