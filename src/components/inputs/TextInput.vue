<template>
  <bordered-input
    type="text"
    v-maska
    :data-maska="mask"
    :data-maska-tokens="maskTokens"
    :color="color"
    :valid="valid"
    :value="modelValue ?? ''"
    @input="updateInput"
  />
</template>

<script setup lang="ts">
import BorderedInput from "./BorderedInput";

import { inputColors } from "@/types/colors";
import { vMaska } from "maska";

export interface propsInterface {
  modelValue: string;
  color?: inputColors;
  valid?: boolean | null;
  mask?: string;
  maskTokens?: string;
}

withDefaults(defineProps<propsInterface>(), {
  color: "gray",
  valid: null,
  mask: "",
  maskTokens: "@:[а-яА-Я,a-zA-Z]",
});

const emits = defineEmits(["update:modelValue"]);

const updateInput = (event: InputEvent) => {
  emits("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>
