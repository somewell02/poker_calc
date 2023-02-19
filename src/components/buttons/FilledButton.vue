<template>
  <button :class="color">
    <slot />
  </button>
</template>

<script setup lang="ts">
export interface propsInterface {
  color?: "primary" | "primary-light" | "secondary";
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
  font-size: 15px;
  border: 0;
  margin: 0;
  border-radius: 5px;
  min-width: 120px;
  &.primary {
    background: var(--primary-color);
    color: white;
    &:hover {
      background: none;
      outline: 1px solid var(--primary-color);
      color: var(--primary-color);
    }
  }
  &.primary-light {
    background: var(--primary-light-color);
    color: var(--text-color);
    &:hover {
      background: none;
      outline: 1px solid var(--primary-light-color);
    }
  }
  &.secondary {
    background: var(--secondary-color);
    color: white;
    &:hover {
      background: none;
      outline: 1px solid var(--secondary-color);
      color: var(--secondary-color);
    }
  }
}
</style>
