import { defineStore } from "pinia";
import { ref } from "vue";

import userSetInterface from "@/types/userSetInterface";

interface userSetItemInterface {
  color: string;
  quantity: number;
  price: number;
}

interface resultPrices {
  items: userSetItemInterface[];
  priority: number;
}

export const useCalculatorStore = defineStore("calculator-store", () => {
  const set = ref<userSetInterface | null>(null);
  const playersQuantity = ref<number | null>(5);
  const budget = ref<number | null>(500);
  const minPrice = ref<number>(0);
  const maxPrice = ref<number>(0);
  const resultPrices = ref<resultPrices[]>([]);

  const selectSet = (newSet: userSetInterface): void => {
    set.value = newSet;
  };

  const reset = (): void => {
    set.value = null;
    playersQuantity.value = null;
    budget.value = null;
    minPrice.value = 0;
    maxPrice.value = 0;
    resultPrices.value = [];
  };

  const calculate = (): void => {
    if (!set.value || !playersQuantity.value || !budget.value) return;

    resultPrices.value = [];

    const multiplicity =
      budget.value <= 100 ? 1 : Math.ceil((budget.value * 0.01) / 5) * 5;

    minPrice.value =
      Math.ceil((budget.value * 0.02) / multiplicity) * multiplicity;

    maxPrice.value =
      Math.ceil((budget.value * 0.1) / multiplicity) * multiplicity;

    const chipsPerPerson = set.value.items.map((item): userSetItemInterface => {
      const itemPerPerson =
        item.quantity && playersQuantity.value
          ? Math.floor(item.quantity / playersQuantity.value)
          : 0;

      return {
        color: item.color,
        quantity: itemPerPerson,
        price: minPrice.value,
      };
    });

    const equalsBudget = (chips: userSetItemInterface[]): boolean => {
      const sum = chips.reduce(
        (res, item) => res + item.quantity * item.price,
        0
      );
      return sum === budget.value;
    };

    const resetPrices = (idx: number): void => {
      chipsPerPerson.forEach((item, i) => {
        if (i > idx - 1) {
          item.price = chipsPerPerson[idx - 1]?.price + multiplicity;
        }
      });
    };

    const incPrice = (minIdx: number, idx: number, maxIdx: number): void => {
      if (minIdx === idx) return;

      if (idx < maxIdx) {
        if (chipsPerPerson[idx].price <= maxPrice.value - multiplicity) {
          chipsPerPerson[idx].price += multiplicity;
          if (equalsBudget(chipsPerPerson)) {
            resultPrices.value.push({
              items: JSON.parse(JSON.stringify(chipsPerPerson)),
              priority: 0,
            });
          }
          incPrice(minIdx, maxIdx, maxIdx);
        } else {
          resetPrices(idx);
          incPrice(minIdx, idx - 1, maxIdx);
        }
      } else if (idx === maxIdx) {
        while (chipsPerPerson[idx].price <= maxPrice.value - multiplicity) {
          chipsPerPerson[idx].price += multiplicity;
          if (equalsBudget(chipsPerPerson)) {
            resultPrices.value.push({
              items: JSON.parse(JSON.stringify(chipsPerPerson)),
              priority: 0,
            });
          }
        }

        resetPrices(idx);
        incPrice(minIdx, idx - 1, maxIdx);
      }
    };

    for (let i = chipsPerPerson.length - 1; i >= 0; i--) {
      incPrice(i - 1, i, chipsPerPerson.length - 1);
    }

    resultPrices.value = resultPrices.value.map((item) => {
      const uniqueLength = new Set(item.items.map((chip) => chip.price)).size;
      const priority = item.items.length - uniqueLength;
      return {
        items: item.items,
        priority,
      };
    });

    resultPrices.value = resultPrices.value
      .filter((item) => item.priority < 2)
      .sort((item1, item2) => {
        const itemPrices1 = item1.items.map((item) => item.price);
        const itemDiff1 = Math.max(...itemPrices1) - Math.min(...itemPrices1);
        const itemPrices2 = item2.items.map((item) => item.price);
        const itemDiff2 = Math.max(...itemPrices2) - Math.min(...itemPrices2);
        return itemDiff2 - itemDiff1;
      });
  };

  return {
    set,
    playersQuantity,
    budget,
    resultPrices,
    selectSet,
    reset,
    calculate,
  };
});
