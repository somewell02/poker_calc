<template>
  <bordered-input type="text" :value="modelValue ?? ''" @input="updateInput" />
</template>

<script setup lang="ts">
import BorderedInput from "./BorderedInput";
import { inputColors } from "@/types/colors";

export interface propsInterface {
  modelValue: string;
  color?: inputColors;
}

withDefaults(defineProps<propsInterface>(), {
  color: "gray",
});

const emits = defineEmits(["update:modelValue"]);

const updateInput = (event: InputEvent) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
