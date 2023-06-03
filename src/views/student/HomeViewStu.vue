<script setup lang="ts">
import { ref } from 'vue';
const selectedSemester = ref('2023년도 1학기');
const semesters = ['2023년도 1학기', '2023년도 2학기', '2022년도 1학기', '2022년도 2학기'];
const notices = [
  {
    title: '오늘 휴강',
    name: '소프트웨어공학',
    time: '2023-05-12',
    id: 1
  },
  {
    title: '내일도 휴강',
    name: '소프트웨어공학',
    time: '2023-05-13',
    id: 2
  }
];
const timeTable = [
  {
    classId: 8458,
    className: '소프트웨어공학',
    professor: '이기훈',
    when: [
      {
        day: 0, // 월 0 화 1 수 2 ...
        time: [0, 1] // 0교시 1교시
      },
      {
        day: 1,
        time: [0, 1]
      }
    ]
  },
  {
    classId: 8459,
    className: '소프트웨어공학2',
    professor: '이기훈',
    when: [
      {
        day: 0, // 월 0 화 1 수 2 ...
        time: [4, 5, 7] // 0교시 1교시
      },
      {
        day: 1,
        time: [3, 4]
      }
    ]
  }
];

const table: any = [];
for (let i = 0; i < 6; i++) {
  table[i] = [];
  for (let j = 0; j < 10; j++) {
    table[i][j] = {
      lectureName: '',
      professorName: '',
      term: 0
    };
  }
}
const setTable = () => {
  timeTable.forEach((lecture) => {
    lecture.when.forEach((t) => {
      let start = t.time[0];
      let exStart = t.time[0];
      let countTerm = 0;
      for (let i = 0; i < t.time.length; i++) {
        if (t.time[i] - exStart > 1) {
          table[t.day][start].lectureName = lecture.className;
          table[t.day][start].professorName = lecture.professor;
          table[t.day][start].term = countTerm;
          start = t.time[i];
          countTerm = 1;
        } else {
          countTerm++;
        }
        exStart = t.time[i];
      }
      table[t.day][start].lectureName = lecture.className;
      table[t.day][start].professorName = lecture.professor;
      table[t.day][start].term = countTerm;
    });
  });
};
setTable();
console.log(table);
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">최근 공지사항</div>
        <q-separator color="#d1d1d1" size="2" />
        <q-list dense padding separator>
          <q-item v-for="(item, index) in notices" :key="index" clickable v-ripple>
            <q-item-section>{{ item.title }}</q-item-section>
            <q-item-section>
              <div class="row justify-around items-center">
                <div>{{ item.name }}</div>
                <div>{{ item.time }}</div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="board column items-center q-mt-md">
        <div class="select-box">
          <q-select
            color="main"
            v-model="selectedSemester"
            :options="semesters"
            label="학기"
            dense
          />
        </div>
        <div class="table">
          <div class="row">
            <div class="blank"></div>
            <div class="col text-center">월</div>
            <div class="col text-center">화</div>
            <div class="col text-center">수</div>
            <div class="col text-center">목</div>
            <div class="col text-center">금</div>
            <div class="col text-center">토</div>
          </div>
          <div class="row">
            <div>
              <div class="time">0</div>
              <div class="time">1</div>
              <div class="time">2</div>
              <div class="time">3</div>
              <div class="time">4</div>
              <div class="time">5</div>
              <div class="time">6</div>
              <div class="time">7</div>
              <div class="time">8</div>
              <div class="time">9</div>
            </div>
            <div class="col" v-for="(el, index) in table" :key="index">
              <div class="class-box" v-for="(el2, index2) in el" :key="index2">
                <div :class="{ class1: el2.term === 1, class2: el2.term === 2 }">
                  {{ el2.lectureName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.blank {
  width: 20px;
  border-left: 1px solid #d1d1d1;
  border-right: 1px solid #d1d1d1;
}
.time {
  width: 20px;
  height: 60px;
  text-align: center;
  border-top: 1px solid #d1d1d1;
  border-left: 1px solid #d1d1d1;
}
.text-center {
  text-align: center;
}
.class-box {
  height: 60px;
  position: relative;
  border-top: 1px solid #d1d1d1;
  border-left: 1px solid #d1d1d1;
}
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
.table {
  width: 100%;
  border-top: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
  border-right: 1px solid #d1d1d1;
}
@mixin class {
  cursor: pointer;
  font-size: 12px;

  position: absolute;
  z-index: 1;
}
.class1 {
  @include class;
  background-color: #f0f088;
  height: 59px;
}
.class2 {
  @include class;
  height: 119px;
  background-color: #ffc6a2;
}
.class3 {
  @include class;
  height: 179px;
}
.font-size-16 {
  font-size: 16px;
}
</style>
