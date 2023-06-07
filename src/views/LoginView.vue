<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '../stores/login';
import axios from 'axios';

const inputId = ref();
const inputPw = ref('');
const router = useRouter();
const goSignup = () => {
  router.push('/signup');
};
const goHome = async () => {
  await axios
    .post('http://localhost:8080/api/user/login', {
      studentId: 2018202014,
      password: '1234'
    })
    .then((res) => {
      //if student
      if (res.status == 200 && res.data.role == 0) {
        const login = useLoginStore();
        login.setLogin(true);
        login.setId(inputId.value);
        router.push('/student');
      } else if (res.status == 200 && res.data.role == 1) {
        const login = useLoginStore();
        login.setLogin(true);
        login.setId(inputId.value);
        router.push('/professor');
      } else {
        alert('다시 시도해주세요');
      }
    })
    .catch((err) => {
      console.log(err);
      alert('다시 시도해주세요');
    });
  //로그인 데이터 확인
  // const login = useLoginStore();
  // login.setLogin(true);
  // login.setId(inputId.value);
  // if (student) {
  // router.push('/student');
  // }
  // else if (admin)
  // router.push('/admin');
  // else (professor)
  // router.push('/professor');
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
