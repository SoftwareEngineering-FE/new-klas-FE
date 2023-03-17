<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const inputId = ref('');
const inputPw = ref('');
const inputPwCheck = ref('');
const inputPhone = ref('');
const inputEmail = ref('');
const router = useRouter();
const goLogin = () => {
  router.push('/');
};
</script>
<template>
  <div class="container flex flex-center column">
    <q-img src="/svg/logo.svg" width="140px" />
    <q-input
      class="q-mt-md"
      color="kbrown"
      :dense="true"
      v-model="inputId"
      label="아이디 :"
      label-color="white"
      placeholder="숫자 10자리"
      mask="##########"
      :input-style="{
        color: 'white'
      }"
    />
    <q-input
      class="q-mt-xs"
      color="kbrown"
      :dense="true"
      v-model="inputPw"
      label="비밀번호 :"
      label-color="white"
      type="password"
      :input-style="{
        color: 'white'
      }"
    /><q-input
      class="q-mt-xs"
      color="kbrown"
      :dense="true"
      v-model="inputPwCheck"
      label="비밀번호 확인 :"
      label-color="white"
      type="password"
      :input-style="{
        color: 'white'
      }"
    /><q-input
      class="q-mt-xs"
      color="kbrown"
      :dense="true"
      v-model="inputPhone"
      label="전화번호 :"
      label-color="white"
      placeholder="000-0000-0000"
      mask="###-####-####"
      :input-style="{
        color: 'white'
      }"
    /><q-input
      class="q-mt-xs"
      color="kbrown"
      :dense="true"
      v-model="inputEmail"
      label="이메일 :"
      label-color="white"
      type="email"
      placeholder="sample@sample.com"
      :input-style="{
        color: 'white'
      }"
    />
    <div class="row q-mt-md">
      <q-btn @click="goLogin" color="kbrown" label="회원가입" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  background-color: black;
  height: 100vh;
}
</style>
