<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
const selectedClass = ref('소프트웨어공학');
const classes = ['소프트웨어공학', '운영체제'];
const selectedSemester = ref('2023년도 1학기');
const semesters = ['2023년도 1학기', '2023년도 2학기', '2022년도 1학기', '2022년도 2학기'];
const q = useQuasar();
const router = useRouter();
const postData = {
  className: '소프트웨어공학',
  classDesc: '앞으로 강의 진행은 ,,,'
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="row q-mb-md">
          <div class="select-box q-mr-md">
            <q-select color="main" v-model="selectedSemester" :options="semesters" dense />
          </div>

          <div class="select-box">
            <q-select color="main" v-model="selectedClass" :options="classes" dense />
          </div>
        </div>
        <q-separator></q-separator>
        <div class="post-head">
          <div class="post-title">{{ postData.className }} 강의계획서</div>
        </div>
        <div class="post-body">{{ postData.classDesc }}</div>
        <q-separator></q-separator>
        <div class="post-foot row justify-end"></div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.background {
  background-color: #f3f3f3;
  padding: 15px 20px;
}
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
.board {
  background-color: #fafafa;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 15px;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.select-box {
  width: 200px;
}
.post-head {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: #f3f3f3;
  padding: 10px;
}
.post-title {
  font-size: 20px;
  font-weight: bold;
}
.post-body {
  padding: 20px 15px;
  font-size: 14px;
}
.select-box {
  width: 200px;
}
</style>