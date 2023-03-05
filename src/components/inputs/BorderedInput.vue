<template>
  <input
    :class="[
      color,
      {
        validated: valid === true,
        failed: valid === false,
      },
    ]"
  />
</template>

<script setup lang="ts">
import { inputColors } from "@/types/colors";

export interface propsInterface {
  color?: inputColors;
  valid?: boolean | null;
}

withDefaults(defineProps<propsInterface>(), {
  color: "gray",
  valid: null,
});
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  padding: 0 20px;
  height: 40px;
  background: transparent;
  outline: none;
  border-radius: 3px;
  font-size: 14px;
  border: 1px solid;
  color: var(--text-color);
  &.gray {
    border-color: var(--input-color);
  }
  &.primary {
    border-color: var(--primary-color);
  }
  &.validated {
    border-color: var(--success-color);
  }
  &.failed {
    border-color: var(--error-color);
  }
  &:focus {
    border-width: 2px;
    padding: 0 19px;
  }
  &::placeholder {
    color: var(--secondary-color);
  }
}
</style>
