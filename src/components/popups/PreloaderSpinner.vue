<template>
  <div v-if="isShow" :class="['preloader', cls]">
    <div class="lds-ellipsis">
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMainStore } from "@/store/main-store";
import { storeToRefs } from "pinia";

const mainStore = storeToRefs(useMainStore());
const isShow = ref<boolean>(true);
const cls = ref<string>("");

const show = (): void => {
  cls.value = "";
  isShow.value = true;
};

const hide = (): void => {
  if (isShow.value) {
    cls.value = "hide";
    setTimeout(() => {
      isShow.value = false;
    }, 300);
  }
};

watch(mainStore.isLoading, (v) => (v ? show() : hide()));
</script>

<style lang="scss" scoped>
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  background: var(--background-color);
  border-radius: 5px;
  z-index: 100;
  transition: 0.3s;
  &.hide {
    opacity: 0;
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 10px;
    .item {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--primary-color);
      animation-timing-function: cubic-bezier(0, 1, 1, 0);
      &:nth-child(1) {
        left: 8px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      &:nth-child(2) {
        left: 8px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-child(3) {
        left: 32px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      &:nth-child(4) {
        left: 56px;
        animation: lds-ellipsis3 0.6s infinite;
      }
    }
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
}
</style>
