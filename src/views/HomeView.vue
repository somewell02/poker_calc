<template>
  <div class="home-wrap container">
    <h1>Калькулятор номиналов фишек</h1>

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
      <div class="calculator-form-item">
        <h4>Информация по игре</h4>
        <div class="calculator-form-item-input calculator-form-info">
          <number-input
            v-model.number="calculatorStore.playersQuantity"
            placeholder="Количество игроков"
          />
          <number-input
            v-model.number="calculatorStore.budget"
            placeholder="Бюджет"
          />
        </div>
      </div>
      <div class="calculator-form-item">
        <filled-button class="calculator-form-submit-btn">
          Рассчитать
        </filled-button>
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
import NumberInput from "@/components/inputs/NumberInput.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";

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
  calculatorStore.calculate();
};
</script>

<style lang="scss" scoped>
.home-wrap {
  padding: 40px 0;

  .calculator-form {
    margin-top: 40px;

    .calculator-form-item {
      &:not(:first-child) {
        margin-top: 30px;
      }

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

    .calculator-form-info {
      display: flex;
      gap: 20px;
    }

    .calculator-form-submit-btn {
      width: 200px;
    }
  }
}
</style>
