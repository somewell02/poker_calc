<template>
  <input :class="color" />
</template>

<script setup lang="ts">
export interface propsInterface {
  color?: "gray" | "primary";
}

withDefaults(defineProps<propsInterface>(), {
  color: "gray",
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
  &.gray {
    color: var(--text-color);
    border: 1px solid var(--input-color);
    &:focus {
      border: 2px solid var(--input-color);
      padding: 0 19px;
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
  &.primary {
    color: var(--text-color);
    border: 1px solid var(--primary-color);
    &:focus {
      border: 2px solid var(--primary-color);
      padding: 0 19px;
    }
    &::placeholder {
      color: var(--secondary-color);
    }
  }
}
</style>
