import { defineStore } from "pinia";
import { ref } from "vue";

import userSetInterface from "@/types/userSetInterface";
import userSetItemInterface from "@/types/userSetItemInterface";

export const useCalculatorStore = defineStore("calculator-store", () => {
  const set = ref<userSetInterface | null>(null);
  const playersQuantity = ref<number | null>(null);
  const budget = ref<number | null>(null);

  const selectSet = (newSet: userSetInterface): void => {
    set.value = newSet;
  };

  const reset = (): void => {
    set.value = null;
    playersQuantity.value = null;
    budget.value = null;
  };

  const calculate = (): void => {
    if (!set.value || !playersQuantity.value) return;

    const chipsPerPerson = set.value.items.map((item): userSetItemInterface => {
      let itemPerPerson = 0;
      if (item.quantity && playersQuantity.value) {
        itemPerPerson = Math.floor(item.quantity / playersQuantity.value);
      }

      return {
        color: item.color,
        quantity: itemPerPerson,
      };
    });

    console.log(chipsPerPerson);
  };

  return { set, playersQuantity, budget, selectSet, reset, calculate };
});
