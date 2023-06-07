<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
const inputId = ref('');
const inputPw = ref('');
const inputName = ref('');
const inputBirth = ref('');
const inputPwCheck = ref('');
const inputPhone = ref('');
const inputEmail = ref('');
const router = useRouter();
const userType = ref('');
const success = ref();
const goLogin = async () => {
  console.log(
    inputBirth.value.slice(0, 4) +
      '-' +
      inputBirth.value.slice(4, 6) +
      '-' +
      inputBirth.value.slice(6)
  );
  const result = axios
    .post('http://localhost:8080/api/user/signUp', {
      studentId: inputId.value,
      password: inputPw.value,
      name: inputName.value,
      birth:
        inputBirth.value.slice(0, 4) +
        '-' +
        inputBirth.value.slice(4, 6) +
        '-' +
        inputBirth.value.slice(6),
      address: '서울',
      phoneNumber: inputPhone.value,
      role: userType.value,
      departmentName: '컴퓨터정보공학부'
    })
    .then((res) => {
      console.log(res.status);
      if (res.status == 201) {
        router.push('/');
      } else {
        alert('다시 해주세요.');
      }
    })
    .catch((err) => {
      console.log(err);
      alert('다시 해주세요.');
    });

  // router.push('/');
};
</script>
<template>
  <div class="container flex flex-center column">
    <q-img src="/svg/logo.svg" width="140px" />
    <div class="q-gutter-sm color-white">
      <q-radio color="white" dark left-label v-model="userType" val="학생" label="학생" />
      <q-radio color="white" dark left-label v-model="userType" val="교수" label="교수" />
    </div>
    <q-input
      class="q-mt-md"
      color="kbrown"
      :dense="true"
      v-model="inputName"
      label="이름 :"
      label-color="white"
      :input-style="{
        color: 'white'
      }"
    />
    <q-input
      class="q-mt-xs"
      color="kbrown"
      :dense="true"
      v-model="inputBirth"
      label="생년월일 :"
      label-color="white"
      placeholder="숫자 8자리"
      mask="########"
      :input-style="{
        color: 'white'
      }"
    />
    <q-input
      class="q-mt-xs"
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
.color-white {
  color: white;
}
.container {
  background-color: black;
  height: 100vh;
}
</style>
