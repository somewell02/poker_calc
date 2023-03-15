<template>
  <div
    :class="[
      'chips-set-card',
      { bordered: isBordered, active: isActive, small: isSmall },
    ]"
  >
    <div v-if="title" class="card-title">
      {{ title }}
    </div>
    <div class="card-chips-list">
      <chip-card
        v-for="chip in chips"
        :key="chip.color"
        :chip="getChip(chip.color)"
        :quantity="chip.quantity"
        :price="chip.price"
        :is-small="isSmall"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChipCard from "@/components/cards/ChipCard.vue";
import { useChipsStore } from "@/store/chipsStore";
import userSetItemInterface from "@/types/userSetItemInterface";

export interface propsInterface {
  chips: userSetItemInterface[];
  title?: string;
  isSmall?: boolean;
  isBordered?: boolean;
  isActive?: boolean;
}

withDefaults(defineProps<propsInterface>(), {
  title: "",
  isSmall: false,
  isBordered: false,
  isActive: false,
});

const chipsStore = useChipsStore();

const getChip = (color: string) =>
  chipsStore.chips.find((item) => item.id === color) ?? {};
</script>

<style lang="scss" scoped>
.chips-set-card {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &.bordered {
    padding: 20px 15px;
    @include bordered;

    &.active {
      border-color: var(--primary-color);
    }
  }

  .card-title {
    text-align: center;
  }

  .card-chips-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
  }

  &:not(.small) {
    width: 100%;

    .card-chips-list {
      gap: 40px;
    }
  }

  &.small {
    width: fit-content;

    .card-chips-list {
      gap: 20px;
    }
  }
}
</style>
