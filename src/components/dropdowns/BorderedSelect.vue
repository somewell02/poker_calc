<template>
  <div class="bordered-select">
    <bordered-button
      color="gray"
      :class="['selected-item', { active: isActive }]"
      @click="disabled ? null : (isActive = !isActive)"
    >
      {{ prefix ? prefix + " " + selectedTitle.toLowerCase() : selectedTitle }}
      <arrow-icon />
    </bordered-button>
    <div :class="['options', dropdownSide]" v-if="isActive">
      <button
        v-for="option in options"
        :key="option.id"
        :class="['option-item', { active: option.id === modelValue }]"
        @click="selectOption(option)"
      >
        {{ option.title ?? option.id }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BorderedButton from "@/components/buttons/BorderedButton.vue";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import { computed, ref } from "vue";

export interface optionInterface {
  id: string;
  title?: string;
}

export interface propsInterface {
  options: optionInterface[];
  modelValue: string;
  prefix?: string;
  dropdownSide?: string;
  defaultTitle?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<propsInterface>(), {
  prefix: "",
  dropdownSide: "left",
  defaultTitle: "Выберете значение",
  disabled: false,
});

const emits = defineEmits(["update:modelValue"]);

const isActive = ref(false);

const selectedTitle = computed(() => {
  if (props.modelValue && props.options) {
    return props.options.find(
      (option: optionInterface) => option.id === props.modelValue
    ).title;
  } else {
    return props.defaultTitle;
  }
});

const selectOption = (option: optionInterface): void => {
  emits("update:modelValue", option.id);
  isActive.value = false;
};
</script>

<style lang="scss" scoped>
.bordered-select {
  position: relative;
  min-width: 150px;
  .selected-item {
    width: 100%;
    @include flex-between;
    .icon {
      width: 12px;
      height: 12px;
      margin-left: 15px;
      pointer-events: none;
    }
    &:hover {
      background: none;
    }
    &.active {
      .icon {
        transform: rotate(180deg);
      }
    }
  }
  .options {
    position: absolute;
    top: calc(100% + 7px);
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
    background: var(--background-color);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    max-height: 250px;
    min-width: 100%;
    z-index: 10;
    @include custom-scroll;
    .option-item {
      cursor: pointer;
      width: 100%;
      padding: 10px 20px;
      font-size: 14px;
      margin: 0;
      text-align: left;
      color: var(--text-color);
      border: solid var(--border-color);
      border-width: 0;
      background: none;
      &:not(:first-child) {
        border-width: 1px 0 0 0;
      }
      &:first-child {
        border-radius: 5px 5px 0 0;
      }
      &:last-child {
        border-radius: 0 0 5px 5px;
      }
      &:hover,
      &.active {
        background: var(--hover-color);
      }
    }
  }
}
</style>
