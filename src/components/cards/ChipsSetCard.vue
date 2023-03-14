<template>
  <div :class="['chips-set-card', { bordered: isBordered, small: isSmall }]">
    <chip-card
      v-for="chip in chips"
      :key="chip.color"
      :chip="getChip(chip.color)"
      :quantity="chip.quantity"
      :price="chip.price"
      :is-small="isSmall"
    />
  </div>
</template>

<script setup lang="ts">
import ChipCard from "@/components/cards/ChipCard.vue";
import { useChipsStore } from "@/store/chipsStore";
import userSetItemInterface from "@/types/userSetItemInterface";

export interface propsInterface {
  chips: userSetItemInterface[];
  isSmall?: boolean;
  isBordered?: boolean;
}

withDefaults(defineProps<propsInterface>(), {
  isSmall: false,
  isBordered: false,
});

const chipsStore = useChipsStore();

const getChip = (color: string) =>
  chipsStore.chips.find((item) => item.id === color) ?? {};
</script>

<style lang="scss" scoped>
.chips-set-card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &:not(.small) {
    width: 100%;
    gap: 40px;
  }

  &.small {
    width: fit-content;
    gap: 20px;
  }

  &.bordered {
    padding: 20px 15px;
    @include bordered;
  }
}
</style>
