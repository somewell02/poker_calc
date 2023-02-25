<template>
  <transition name="fade">
    <div class="message-wrap" v-if="isShow">
      <div class="message-content" :class="type">
        <div class="message-text">
          <div v-if="text" v-html="text" />
          <slot v-else />
        </div>
        <close-icon @click="close" />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import CloseIcon from "@/components/icons/CloseIcon.vue";

import { ref, watch } from "vue";
import { alertTypes } from "@/types/colors";

export interface propsInterface {
  type?: alertTypes;
  duration?: number;
}

const props = withDefaults(defineProps<propsInterface>(), {
  type: "information",
  duration: 10000,
});

const isShow = ref<boolean>(false);
const text = ref<string>("");
const type = ref<alertTypes>("information");

const open = (curText?: string, curType?: alertTypes): void => {
  type.value = curType ?? props.type;
  text.value = curText ?? "";
  isShow.value = true;
};

const close = (): void => {
  isShow.value = false;
};

watch(isShow, (v) => {
  if (v) {
    setTimeout(close, props.duration);
  }
});

defineExpose({ open, close });
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.message-wrap {
  @include flex-center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 20px 20px 20px;
  pointer-events: none;
  .message-content {
    min-width: 300px;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    pointer-events: auto;
    &.information {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
    &.error {
      background: var(--error-color);
      color: white;
    }
    &.success {
      background: var(--success-color);
      color: white;
    }
    .message-text {
      flex-grow: 3;
      text-align: center;
    }
    .icon {
      margin-left: 15px;
      cursor: pointer;
      :deep(*) {
        stroke: white;
      }
    }
  }
}
</style>
