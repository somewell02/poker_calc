<template>
  <button :class="color">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { borderedButtonColors } from "@/types/colors";

export interface propsInterface {
  color?: borderedButtonColors;
}

withDefaults(defineProps<propsInterface>(), {
  color: "primary",
});
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  padding: 10px 20px;
  height: 40px;
  font-size: 14px;
  margin: 0;
  border-radius: 5px;
  min-width: 120px;
  background: none;
  &.primary {
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    &:hover {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
  }
  &.gray {
    color: var(--text-color);
    border: 1px solid var(--border-color);
    &:hover {
      background: var(--border-color);
    }
  }
}
</style>
