<template>
  <bordered-input
    type="number"
    :color="color"
    :valid="valid"
    :value="modelValue ?? ''"
    @input="updateInput"
  />
</template>

<script setup lang="ts">
import BorderedInput from "./BorderedInput";

import { inputColors } from "@/types/colors";

export interface propsInterface {
  modelValue: number | null;
  color?: inputColors;
  valid?: boolean | null;
}

withDefaults(defineProps<propsInterface>(), {
  color: "gray",
  valid: null,
});

const emits = defineEmits(["update:modelValue"]);

const updateInput = (event: InputEvent) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
