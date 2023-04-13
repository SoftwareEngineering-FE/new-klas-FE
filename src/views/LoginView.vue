<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login';

const router = useRouter();
const goSignup = () => {
  router.push('/signup');
};
const goHome = () => {
  //로그인 데이터 확인
  const login = useLoginStore();
  login.setLogin(true);

  // if (student) {
  //   login.setUserType('student');
  //   router.push('/student');
  // }
  //else if (admin)
  //login.setUserType('admin');
  router.push('/admin');
  //else (professor)
  //login.setUserType('professor');
  // router.push('/professor');
};
const inputId = ref('');
const inputPw = ref('');
</script>
<template>
  <div class="container flex flex-center column">
    <q-img src="/svg/logo.svg" width="140px" />
    <q-input
      class="q-mt-md"
      color="kbrown"
      :dense="true"
      v-model="inputId"
      placeholder="아이디"
      mask="##########"
      :input-style="{
        color: 'white'
      }"
    />
    <q-input
      color="kbrown"
      :dense="true"
      v-model="inputPw"
      type="password"
      placeholder="비밀번호"
      :input-style="{
        color: 'white'
      }"
    />
    <div class="row q-mt-md">
      <q-btn @click="goSignup" color="gray" label="회원가입" class="q-mr-sm" />
      <q-btn @click="goHome" color="kbrown" label="로그인" />
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  background-color: black;
  height: 100vh;
}
</style>
