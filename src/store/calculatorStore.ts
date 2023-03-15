import { defineStore } from "pinia";
import { ref } from "vue";

import userSetInterface from "@/types/userSetInterface";

export const useCalculatorStore = defineStore("calculator-store", () => {
  const set = ref<userSetInterface | null>(null);

  const selectSet = (newSet: userSetInterface): void => {
    set.value = newSet;
  };

  const reset = (): void => {
    set.value = null;
  };

  return { set, selectSet, reset };
});
