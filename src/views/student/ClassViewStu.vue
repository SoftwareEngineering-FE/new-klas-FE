<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const q = useQuasar();
const selectedClass = ref('소프트웨어공학');
const classes = ['소프트웨어공학', '운영체제'];

const selectedSemester = ref('2023년도 1학기');
const semesters = ['2023년도 1학기', '2023년도 2학기', '2022년도 1학기', '2022년도 2학기'];
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title row items-center">
          <div class="q-mr-md">수강중인 강의</div>

          <div class="select-box q-mr-md">
            <q-select color="main" v-model="selectedSemester" :options="semesters" dense />
          </div>

          <div class="select-box">
            <q-select color="main" v-model="selectedClass" :options="classes" dense />
          </div>
        </div>
      </div>
      <div class="board q-mt-sm">
        담당 교수 : <strong>이기훈 교수님</strong> 연락처 : <strong>010-xxxx-xxxx</strong> 이메일 :
        <strong>sample@sample.com</strong>
      </div>
      <div class="row q-mt-md">
        <div
          :class="{
            'col-12': q.screen.lt.md,
            'col-6': !q.screen.lt.md,
            'q-pr-sm': !q.screen.lt.md
          }"
        >
          <div class="board">
            <div class="title">공지사항</div>
          </div>
        </div>
        <div
          :class="{
            'col-12': q.screen.lt.md,
            'q-mt-md': q.screen.lt.md,
            'col-6': !q.screen.lt.md,
            'q-pl-sm': !q.screen.lt.md,
          }"
        >
          <div class="board">
            <div class="title">과제</div>
          </div>
        </div>
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
</style>
