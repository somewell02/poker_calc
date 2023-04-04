<template>
  <div :class="['chip-card', { bordered: isBordered, small: isSmall }]">
    <img :src="chip.imgUrl" :alt="chip.title" class="chip-card-img" />
    <div v-if="price || quantity" class="chip-card-options">
      <template v-if="isSmall">
        <div class="chip-card-option">
          <template v-if="quantity">{{ quantity }}</template>
          <template v-if="quantity && price">, </template>
          <template v-if="price">{{ price }} ₽</template>
        </div>
      </template>
      <template v-else>
        <div v-if="quantity" class="chip-card-option chip-card-quantity">
          Количество: {{ quantity }}
        </div>
        <div v-if="price" class="chip-card-option chip-card-price">
          Номинал: {{ price }} ₽
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import chipInterface from "@/types/chipInterface";

export interface propsInterface {
  chip: chipInterface;
  quantity?: number;
  price?: number;
  isSmall?: boolean;
  isBordered?: boolean;
}

withDefaults(defineProps<propsInterface>(), {
  isBordered: false,
});
</script>

<style lang="scss" scoped>
.chip-card {
  width: fit-content;

  &.bordered {
    padding: 20px 15px;
    @include bordered;
  }

  &:not(.small) .chip-card-img {
    width: 123px;
    height: 123px;
  }

  &.small .chip-card-img {
    width: 56px;
    height: 56px;
  }

  .chip-card-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;

    .chip-card-option {
      font-size: 14px;
      color: var(--text-color);
    }
  }

  &:not(.small) .chip-card-options {
    margin-top: 10px;
  }

  &.small .chip-card-options {
    margin-top: 5px;
  }
}
</style>
