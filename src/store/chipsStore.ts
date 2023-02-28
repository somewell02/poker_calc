import { defineStore } from "pinia";
import { ref } from "vue";

import chipInterface from "@/types/chipInterface";
import ChipModel from "@/models/ChipModel";

export const useChipsStore = defineStore("chips-store", () => {
  const chips = ref<chipInterface[]>([]);

  const loadChips = async (): Promise<void> => {
    chips.value = (await ChipModel.getAll()) ?? [];
  };

  return { chips, loadChips };
});
