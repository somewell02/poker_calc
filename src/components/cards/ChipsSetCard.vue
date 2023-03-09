<template>
  <div :class="['chips-set-card', { bordered: isBordered }]">
    <chip-card
      v-for="chip in chips"
      :key="chip.id"
      :chip="getChip(chip.id)"
      :quantity="chip.quantity"
      :price="chip.price"
    />
  </div>
</template>

<script setup lang="ts">
import ChipCard from "@/components/cards/ChipCard.vue";
import { useChipsStore } from "@/store/chipsStore";

interface chipProp {
  id: string;
  quantity?: number;
  price?: number;
}

export interface propsInterface {
  chips: chipProp[];
  isBordered?: boolean;
}

withDefaults(defineProps<propsInterface>(), {
  isBordered: false,
});

const chipsStore = useChipsStore();

const getChip = (id) => chipsStore.chips.find((item) => item.id === id) ?? {};
</script>

<style lang="scss" scoped>
.chips-set-card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;

  &.bordered {
    padding: 20px 15px;
    @include bordered;
  }
}
</style>
