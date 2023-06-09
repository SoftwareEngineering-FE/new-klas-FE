<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { useLoginStore } from '../../stores/login';
const login = useLoginStore();

const searchText = ref('');
const q = useQuasar();
const lectureBasket = ref(new Map());
type whenType = {
  day: number;
  time: number[];
};
type lectureType = {
  classId: number;
  lectureName: string;
  professor: string;
  when: whenType[];
};
const hasTimeOverlap = (time1: number[], time2: number[]) => {
  for (const t1 of time1) {
    for (const t2 of time2) {
      if (t1 === t2) {
        return true;
      }
    }
  }
  return false;
};
const dropLecture = async (lectureId: number) => {
  await axios
    .delete(
      'http://localhost:8080/api/delete/subject/' +
        login.loginId +
        '/' +
        lectureId +
        '?year=2023&semester=1'
    )
    .then((res) => {
      console.log(res.data);
      getMyClasses();
    })
    .catch((err) => {
      console.log(err);
    });
};
const addLecture = (lecture: lectureType) => {
  for (const existingLecture of lectureBasket.value.values()) {
    for (const existingWhen of existingLecture.when) {
      for (const newWhen of lecture.when) {
        if (existingWhen.day !== newWhen.day) {
          continue;
        }
        if (hasTimeOverlap(existingWhen.time, newWhen.time)) {
          console.log('강의 시간이 겹칩니다.');
          alert('시간이 겹치는 수업이 있습니다.');
          return;
        }
      }
    }
  }
  lectureBasket.value.set(lecture.classId, lecture);
  console.log(lecture.classId);
};
const deleteLecture = (lectureId: number) => {
  lectureBasket.value.delete(lectureId);
};
type dayType = {
  [key: number]: string;
};
const day: dayType = { 0: '월', 1: '화', 2: '수', 3: '목', 4: '금', 5: '토', 6: '일' };
const lectures = ref([]);
const myLectures = ref([]);
const getMyClasses = async () => {
  await axios
    .get('http://localhost:8080/main/schedule?studentId=' + login.loginId + '&year=2023&semester=1')
    .then((res) => {
      console.log(res.data);
      myLectures.value = res.data;
    });
};
const registrateLecture = async (lectureId: number) => {
  await axios
    .post('http://localhost:8080/api/register/subject', {
      studentId: login.loginId,
      classId: lectureId,
      year: 2023,
      semester: 1
    })
    .then((res) => {
      getMyClasses();
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
    
};
const getClasses = async () => {
  await axios
    .get(
      'http://localhost:8080/api/search/' +
        login.loginId +
        '?year=2023&semester=1&search=' +
        searchText.value
    )
    .then((res) => {
      lectures.value = res.data.classes;
    });
};
onMounted(() => {
  getClasses();
  getMyClasses();
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="top-board">
        <div class="title">신청된 강의</div>
        <table class="q-mb-sm">
          <colgroup>
            <col width="2%" />
            <col width="10%" />
            <col width="3%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <th class="ths">제거</th>
              <th class="ths">과목명</th>
              <th class="ths">교수</th>
              <th class="ths">시간</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lecture, index) in myLectures" :key="index">
              <td>
                <q-btn
                  flat
                  color="kbrown"
                  icon="remove"
                  dense
                  @click="dropLecture(lecture.classId)"
                />
              </td>
              <td>{{ lecture.className }}</td>
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
                <col width="7%" />
                <col width="10%" />
                <col width="3%" />
                <col width="5%" />
                <col width="7%" />
              </colgroup>
              <thead>
                <tr>
                  <th class="ths">제거</th>
                  <th class="ths">과목명</th>
                  <th class="ths">교수</th>
                  <th class="ths">시간</th>
                  <th class="ths">신청</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="[key, value] in lectureBasket" :key="key">
                  <td>
                    <q-btn flat color="kbrown" icon="remove" dense @click="deleteLecture(key)" />
                  </td>
                  <td>{{ value.className }}</td>
                  <td>{{ value.professor }}</td>
                  <td>
                    <span v-for="(time, tIndex) in value.when" :key="tIndex">{{
                      ' ' + day[time.day] + ' ' + time.time.join(',')
                    }}</span>
                  </td>
                  <td>
                    <q-btn flat color="kbrown" icon="check" dense @click="registrateLecture(key)" />
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
            <div class="title">강의 조회</div>
            <div class="row q-my-sm">
              <q-input
                outlined
                class="col-8"
                color="kbrown"
                v-model="searchText"
                placeholder="교수명 / 강의명 검색"
                dense
              />
              <q-btn class="q-mx-sm" color="kbrown" icon="search" @click="getClasses()" />
            </div>
            <div class="table">
              <table class="q-mb-s">
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
                    <td>{{ lecture.className }}</td>
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
  min-height: 500px;
}
.top-board {
  background-color: #fafafa;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 15px;
  min-height: 100px;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.select-box {
  width: 200px;
}
.table {
  max-height: 360px;
  overflow-y: scroll;
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
  border-top: 2px solid gray;
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
