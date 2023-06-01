<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const q = useQuasar();
const lectureBasket = ref(new Map());
type whenType = {
  day: number;
  time: number[];
};
type lectureType = {
  lectureId: number;
  lectureName: string;
  professor: string;
  when: whenType[];
};
const addLecture = (lecture: lectureType) => {
  lectureBasket.value.set(lecture.lectureId, lecture);
  console.log(lectureBasket.value);
};
const deleteLecture = (lectureId : number) => {
  lectureBasket.value.delete(lectureId);
};
type dayType = {
  [key: number]: string;
};
const day: dayType = { 0: '월', 1: '화', 2: '수', 3: '목', 4: '금', 5: '토', 6: '일' };
const lectures = [
  {
    lectureId: 8458,
    lectureName: '소프트웨어공학',
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
    lectureId: 8459,
    lectureName: '소프트웨어공학2',
    professor: '이기훈',
    when: [
      {
        day: 3, // 월 0 화 1 수 2 ...
        time: [0, 1] // 0교시 1교시
      },
      {
        day: 4,
        time: [0, 1]
      }
    ]
  }
];
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="row q-mt-md">
        <div
          :class="{
            'col-12': q.screen.lt.md,
            'col-6': !q.screen.lt.md,
            'q-pr-sm': !q.screen.lt.md
          }"
        >
          <div class="board">
            <div class="title">강의 장바구니</div>
            <table class="q-mb-sm">
              <colgroup>
                <col width="1%" />
                <col width="10%" />
                <col width="3%" />
                <col width="5%" />
              </colgroup>
              <thead>
                <tr>
                  <th class="ths">추가</th>
                  <th class="ths">과목명</th>
                  <th class="ths">교수</th>
                  <th class="ths">시간</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="[key, value] in lectureBasket" :key="key">
                  <td>
                    <q-btn flat color="kbrown" icon="remove" dense @click="deleteLecture(key)" />
                  </td>
                  <td>{{ value.lectureName }}</td>
                  <td>{{ value.professor }}</td>
                  <td>
                    <span v-for="(time, tIndex) in value.when" :key="tIndex">{{
                      ' ' + day[time.day] + ' ' + time.time.join(',')
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
            <div class="title">수강 신청</div>
            <table class="q-mb-sm">
              <colgroup>
                <col width="1%" />
                <col width="10%" />
                <col width="3%" />
                <col width="5%" />
              </colgroup>
              <thead>
                <tr>
                  <th class="ths">추가</th>
                  <th class="ths">과목명</th>
                  <th class="ths">교수</th>
                  <th class="ths">시간</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(lecture, index) in lectures" :key="index">
                  <td>
                    <q-btn flat color="kbrown" icon="add" dense @click="addLecture(lecture)" />
                  </td>
                  <td>{{ lecture.lectureName }}</td>
                  <td>{{ lecture.professor }}</td>
                  <td>
                    <span v-for="(time, tIndex) in lecture.when" :key="tIndex">{{
                      ' ' + day[time.day] + ' ' + time.time.join(',')
                    }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
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
  max-width: 1800px;
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
  border-right: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
}
.first {
  width: 20px;
}
.td {
  position: relative;
  border-left: 1px solid #d1d1d1;
  border-top: 1px solid #d1d1d1;
  height: 60px;
}
@mixin lecture {
  cursor: pointer;
  font-size: 12px;
  background-color: rgb(240, 240, 136);
  position: absolute;
  width: 100%;
  z-index: 1;
}
.font-size-16 {
  font-size: 16px;
}
table {
  border-collapse: collapse;
}
th {
  background: #efe3e3;
}
td {
  text-align: center;
}
.ths {
  border-bottom: 1px solid gray;
}
</style>
