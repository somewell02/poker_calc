<template>
  <div class="auth-wrap container">
    <div class="auth-content bordered-div">
      <h1>PockerCalc</h1>
      <div class="auth-form">
        <text-input
          v-model="authForm.fields.login.value"
          :valid="authForm.fields.login.inputValid ?? null"
          name="login"
          id="login"
          placeholder="Login"
        />
        <filled-button is-full @click="auth"> Войти </filled-button>
      </div>
    </div>
    <message-alert />
  </div>
</template>

<script setup lang="ts">
import MessageAlert from "@/components/popups/MessageAlert.vue";
import FilledButton from "@/components/buttons/FilledButton.vue";
import TextInput from "@/components/inputs/TextInput.vue";
import { useForm } from "@/use/form";

const required = (val: string) => !!val;
const maxLength = (num: number) => (val: string) => val.length <= num;

const authForm = useForm({
  login: {
    value: "",
    validators: { required, maxLength: maxLength(16) },
  },
});

const auth = () => {
  authForm.submitted.value = true;
  console.log(authForm.valid.value);
};
</script>

<style lang="scss" scoped>
.auth-wrap {
  height: 100vh;
  @include flex-center;
  .auth-content {
    width: 100%;
    max-width: 450px;
    @include flex-center;
    flex-direction: column;
    .auth-form {
      width: 100%;
      display: grid;
      row-gap: 20px;
      margin-top: 20px;
    }
  }
}
</style>
