<template>
  <div class="home-wrap container">
    <bordered-select v-model="select" :options="options" />
    <div class="chip" v-if="select">
      <img
        :src="chipsStore.chips.find((item) => item.id === select).imgUrl"
        :alt="chipsStore.chips.find((item) => item.id === select).title"
      />
    </div>
    <filled-button @click="click">Click</filled-button>
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BorderedSelect from "@/components/dropdowns/BorderedSelect.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";
import { useChipsStore } from "@/store/chipsStore";

const alert = ref();
const chipsStore = useChipsStore();

const click = () => {
  alert.value.open("wqweqw", "error");
};

const select = ref("");
const options = computed(() =>
  chipsStore.chips.map((item) => ({
    id: item.id,
    title: item.title,
  }))
);
</script>

<style lang="scss" scoped>
.chip img {
  width: 300px;
  height: 300px;
}
</style>
