import { defineStore } from "pinia";
import { ref } from "vue";
import { useChipsStore } from "@/store/chipsStore";

export const useMainStore = defineStore("main-store", () => {
  const isLoading = ref<boolean>(true);

  const setLoading = (loading: boolean): void => {
    isLoading.value = loading;
  };

  const initData = async (): Promise<void> => {
    const chipsStore = useChipsStore();
    await chipsStore.loadChips();
    isLoading.value = false;
  };

  return { isLoading, setLoading, initData };
});
