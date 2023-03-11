<template>
  <div class="home-wrap container">
    <bordered-select v-model="select" :options="options" />
    <div v-if="select">
      <chip-card
        :chip="chipsStore.chips.find((item) => item.id === select)"
        :price="10"
      />
    </div>
    <filled-button @click="click">Click</filled-button>
    <chips-set-card :chips="userSetsStore.userSets[0].items" is-bordered />
    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BorderedSelect from "@/components/dropdowns/BorderedSelect.vue";
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";
import { useChipsStore } from "@/store/chipsStore";
import ChipCard from "@/components/cards/ChipCard.vue";
import { useMainStore } from "@/store/mainStore";
import ChipsSetCard from "@/components/cards/ChipsSetCard.vue";
import { useUserSetsStore } from "@/store/userSetsStore";

const mainStore = useMainStore();
mainStore.initData(["chips", "user-sets"]);

const alert = ref();
const chipsStore = useChipsStore();
const userSetsStore = useUserSetsStore();

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
