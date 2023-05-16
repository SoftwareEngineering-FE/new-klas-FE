<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const q = useQuasar();
const selectedClass = ref('소프트웨어공학');
const classes = ['소프트웨어공학', '운영체제'];

const selectedSemester = ref('2023년도 1학기');
const semesters = ['2023년도 1학기', '2023년도 2학기', '2022년도 1학기', '2022년도 2학기'];
const notices = [
  {
    title: '오늘 휴강',
    time: '2023-05-12',
    id: 1
  },
  {
    title: '내일도 휴강',
    time: '2023-05-13',
    id: 2
  }
];
const subjects = [
{
    title: '1차 프젝',
    deadline: '2023-05-12',
    id: 1
  },
  {
    title: '2차 프젝',
    deadline: '2023-05-13',
    id: 2
  }
]
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
            <q-separator color="#d1d1d1" size="2" />
            <q-list dense padding separator>
              <q-item v-for="(item, index) in notices" :key="index" clickable v-ripple>
                <q-item-section>{{ item.title }}</q-item-section>
                <q-item-section>
                  <div class="row justify-around items-center">
                    {{ item.time }}
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div
          :class="{
            'col-12': q.screen.lt.md,
            'q-mt-md': q.screen.lt.md,
            'col-6': !q.screen.lt.md,
            'q-pl-sm': !q.screen.lt.md
          }"
        >
          <div class="board">
            <div class="title">과제</div>
            <q-separator color="#d1d1d1" size="2" />
            <q-list dense padding separator>
              <q-item v-for="(item, index) in subjects" :key="index" clickable v-ripple>
                <q-item-section>{{ item.title }}</q-item-section>
                <q-item-section>
                  <div class="row justify-around items-center">
                    ~{{ item.deadline }} 까지
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
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
