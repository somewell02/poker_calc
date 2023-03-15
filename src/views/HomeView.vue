<template>
  <div class="home-wrap container">
    <h1>Рассчитай номиналы фишек</h1>

    <form @submit.prevent="calculate" class="calculator-form">
      <div class="calculator-form-item">
        <h4>Выбери набор</h4>
        <div class="calculator-form-item-input calculator-form-sets">
          <chips-set-card
            v-for="set in userSetsStore.userSets"
            :key="set.id"
            :chips="set.items"
            :title="set.title"
            is-small
            is-bordered
            :is-active="isSetActive(set.id)"
            @click="select(set)"
          />
        </div>
      </div>
    </form>

    <message-alert ref="alert"></message-alert>
  </div>
</template>

<script setup lang="ts">
import MessageAlert from "@/components/popups/MessageAlert.vue";
import ChipsSetCard from "@/components/cards/ChipsSetCard.vue";

import { useUserSetsStore } from "@/store/userSetsStore";
import { useMainStore } from "@/store/mainStore";
import { useCalculatorStore } from "@/store/calculatorStore";

import { ref } from "vue";
import userSetInterface from "@/types/userSetInterface";

const mainStore = useMainStore();
mainStore.initData(["chips", "user-sets"]);

const alert = ref();
const userSetsStore = useUserSetsStore();
const calculatorStore = useCalculatorStore();

const isSetActive = (id: string): boolean =>
  !!calculatorStore.set && calculatorStore.set.id === id;

const select = (set: userSetInterface): void => {
  calculatorStore.selectSet(set);
};

const calculate = () => {
  console.log("calculate");
};
</script>

<style lang="scss" scoped>
.home-wrap {
  padding: 40px 0;

  .calculator-form {
    margin-top: 40px;

    .calculator-form-item {
      .calculator-form-item-input {
        margin-top: 20px;
      }
    }

    .calculator-form-sets {
      display: flex;
      gap: 20px;

      .chips-set-card {
        cursor: pointer;
      }
    }
  }
}
</style>
