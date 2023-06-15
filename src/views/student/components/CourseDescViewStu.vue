<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '../../../stores/login';

const login = useLoginStore();
const selectedSemester = ref('1');
const semesters = ['1', '2'];
const selectedYear = ref('2023');
const years = ['2023', '2022', '2021', '2020'];
type dayType = {
  [key: number]: string;
};
const day: dayType = { 0: '월', 1: '화', 2: '수', 3: '목', 4: '금', 5: '토', 6: '일' };
const q = useQuasar();
const lectures = ref([]);
const searchText = ref('');
const when = ref('');
const className = ref('');
const professor = ref('');
const desc = ref('');
const countStudent = ref(0);

const getDesc = async (classId: number) => {
  await axios.get('http://localhost:8080/syllabus/read?subjectId=' + classId).then((res) => {
    console.log(res.data);
    className.value = res.data.name;
    professor.value = res.data.professor;
    desc.value = res.data.content;
    countStudent.value = res.data.personnel;
    res.data.when.forEach((time: any) => {
      when.value = day[time.day] + ' ' + time.time.join(',');
    });
  });
};
const getClasses = async () => {
  await axios
    .get(
      'http://localhost:8080/api/search/' +
        login.loginId +
        '?year=' +
        selectedYear.value +
        '&semester=' +
        selectedSemester.value +
        '&search=' +
        searchText.value
    )
    .then((res) => {
      lectures.value = res.data.classes;
    });
};
onMounted(() => {
  getClasses();
});
watch(selectedSemester, () => {
  getClasses();
});
watch(selectedYear, () => {
  getClasses();
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board q-mb-sm">
        <div class="title">강의계획서 조회</div>

        <div class="row q-mb-md items-center">
          <div class="select-box q-mr-md">
            <q-select color="main" v-model="selectedYear" :options="years" dense />
          </div>
          <div class="div q-mr-md">학년도</div>
          <div class="select-box">
            <q-select color="main" v-model="selectedSemester" :options="semesters" dense />
          </div>
          <div class="div q-mr-md">학기</div>
        </div>
        <q-separator></q-separator>
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
                <th class="ths">보기</th>
                <th class="ths">과목명</th>
                <th class="ths">교수</th>
                <th class="ths">시간</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lecture, index) in lectures" :key="index">
                <td>
                  <q-btn
                    flat
                    color="kbrown"
                    icon="visibility"
                    dense
                    @click="getDesc(lecture.classId)"
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
      </div>
      <div class="board">
        <div class="post-head">
          <div class="post-title">{{ className }} 강의계획서</div>
          <div class="row items-center">
            <div class="q-mr-md">교수 : {{ professor }}</div>
            <div class="q-mr-md">수업 시간 : {{ when }}</div>
            <div class="q-mr-md">수강생 : {{ countStudent }}</div>
          </div>
        </div>
        <div class="post-body">{{ desc }}</div>
        <q-separator></q-separator>
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
