import { defineStore } from "pinia";
import { ref } from "vue";

import { useChipsStore } from "@/store/chipsStore";
import { useUserSetsStore } from "@/store/userSetsStore";

export const useMainStore = defineStore("main-store", () => {
  const isLoading = ref<boolean>(true);

  const setLoading = (loading: boolean): void => {
    isLoading.value = loading;
  };

  const initData = async (options: string[] = []): Promise<void> => {
    isLoading.value = true;

    if (options.includes("chips")) {
      const chipsStore = useChipsStore();
      await chipsStore.loadChips();
    }

    if (options.includes("user-sets")) {
      const userSetsStore = useUserSetsStore();
      await userSetsStore.loadUserSets();
    }

    isLoading.value = false;
  };

  return { isLoading, setLoading, initData };
});
