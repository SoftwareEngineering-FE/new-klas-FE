<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useLoginStore } from '../../stores/login';
import axios from 'axios';
import router from '@/router';

const login = useLoginStore();
const selectedSemester = ref('');
const semesters = ref([]);
const notices = ref([]);
const timeTable = ref([]);

const getSemesters = async () => {
  await axios.get('http://localhost:8080/main/semesters?studentId=' + login.loginId).then((res) => {
    semesters.value = res.data.sort((a: any, b: any) => {
      const upperCaseA = a.toUpperCase();
      const upperCaseB = b.toUpperCase();

      if (upperCaseA < upperCaseB) return 1;
      else if (upperCaseA > upperCaseB) return -1;
      else return 0;
    });
    selectedSemester.value = semesters.value[0];
  });
};

const getTableData = async () => {
  await axios
    .get(
      'http://localhost:8080/main/schedule?studentId=' +
        login.loginId +
        '&year=' +
        selectedSemester.value.slice(0, 4) +
        '&semester=' +
        selectedSemester.value.slice(7, 8)
    )
    .then((res) => {
      console.log(selectedSemester.value);
      console.log(res.data);
      timeTable.value = res.data;

      setTable();
    });
};
const getNotice = async () => {
  await axios
    .get('http://localhost:8080/main/notice?studentId=' + login.loginId)
    .then((res) => {
      notices.value = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
onMounted(() => {
  getNotice();
  getSemesters();
});
watch(selectedSemester, () => {
  getTableData();
});
const setTable = () => {
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
  timeTable.value.forEach((lecture: any) => {
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
  return table;
};
const tableRef = computed(() => setTable());
const goNotice = async (id: string) => {
  router.push('/student/notice/' + id);
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">최근 공지사항</div>
        <q-separator color="#d1d1d1" size="2" />
        <q-list dense padding separator>
          <q-item
            v-for="(item, index) in notices"
            :key="index"
            clickable
            v-ripple
            @click="goNotice(item.id)"
          >
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
        <div class="table q-mt-md">
          <div class="row">
            <div class="blank"></div>
            <div class="col day">월</div>
            <div class="col day">화</div>
            <div class="col day">수</div>
            <div class="col day">목</div>
            <div class="col day">금</div>
            <div class="col day">토</div>
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
            <div class="col" v-for="(el, index) in tableRef" :key="index">
              <div class="class-box" v-for="(el2, index2) in el" :key="index2">
                <div :class="{ class1: el2.term === 1, class2: el2.term === 2 }" clickable v-ripple>
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
}
.day {
  text-align: center;
  border-left: 1px solid #d1d1d1;
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
  width: 100%;
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
