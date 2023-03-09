<template>
  <div :class="['chip-card', { bordered: isBordered }]">
    <img :src="chip.imgUrl" :alt="chip.title" class="chip-card-img" />
    <div v-if="price || quantity" class="chip-card-options">
      <div v-if="quantity" class="chip-card-option chip-card-quantity">
        Количество: {{ quantity }}
      </div>
      <div v-if="price" class="chip-card-option chip-card-price">
        Номинал: {{ price }} ₽
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import chipInterface from "@/types/chipInterface";

export interface propsInterface {
  chip: chipInterface;
  quantity?: number;
  price?: number;
  isBordered?: boolean;
}

withDefaults(defineProps<propsInterface>(), {
  isBordered: false,
});
</script>

<style lang="scss" scoped>
.chip-card {
  &:not(.bordered) {
    width: 183px;
  }

  &.bordered {
    width: 215px;
    padding: 20px 15px;
    @include bordered;
  }

  .chip-card-img {
    width: 183px;
    height: 183px;
  }

  .chip-card-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 5px;
    margin-top: 10px;

    .chip-card-option {
      font-size: 14px;
      color: var(--text-color);
    }
  }
}
</style>
