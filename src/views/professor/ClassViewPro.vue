<script setup lang="ts">
import { onMounted, ref, onUpdated, watch } from 'vue';
import type { Ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '../../stores/login';
const login = useLoginStore();

const q = useQuasar();
const router = useRouter();
const selectedClass = ref('');
const selectedSemester = ref('');
const semesters: Ref<any[]> = ref([]);
const classData = ref([]);
const classes1 = ref(new Map()); // semester : [class1, class2, class3]
const classMap = new Map();
const notices = ref([]);
const subjects = ref([]);
// const subjects = [
//   {
//     title: '1차 프젝',
//     deadline: '2023-05-12',
//     id: 1
//   },
//   {
//     title: '2차 프젝',
//     deadline: '2023-05-13',
//     id: 2
//   }
// ];
const references = ref([]);
const getRefs = async (lectureId: number) => {
  await axios.get('http://localhost:8080/api/data/detail/' + lectureId).then((res) => {});
};
const getData = async () => {
  await axios
    .get('http://localhost:8080/api/lecture/' + login.loginId)
    .then((res) => {
      classData.value = res.data.semesters;
      setSemesterClass();
      getNotice();
      getSubject();
    })
    .catch((err) => {
      console.log(err);
    });
};
const getNotice = async () => {
  await axios
    .get(
      'http://localhost:8080/api/notice/' + login.loginId + '/' + classMap.get(selectedClass.value)
    )
    .then((res) => {
      notices.value = res.data.notices;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getSubject = async () => {
  console.log(selectedClass.value);
  await axios
    .get(
      'http://localhost:8080/api/assignment/' +
        login.loginId +
        '/' +
        classMap.get(selectedClass.value)
    )
    .then((res) => {
      console.log(res.data);
      subjects.value = res.data.subjects;
    })
    .catch((err) => {
      console.log(err);
    });
};
const setSemesterClass = () => {
  console.log(classData.value);
  classData.value.sort((a: any, b: any) => {
    const upperCaseA = a.semester.toUpperCase();
    const upperCaseB = b.semester.toUpperCase();

    if (upperCaseA < upperCaseB) return 1;
    else if (upperCaseA > upperCaseB) return -1;
    else return 0;
  });
  classData.value.forEach((el: any, index) => {
    if (index === 0) selectedSemester.value = el.semester;
    semesters.value.push(el.semester);
    classes1.value.set(el.semester, []);
    el.classes.forEach((cl: any, cindex: number) => {
      if (cindex === 0 && index === 0) selectedClass.value = cl.className;
      classes1.value.get(el.semester).push(cl.className);
      classMap.set(cl.className, cl.classId);
    });
  });
};
onMounted(() => {
  getData();
});
watch(selectedSemester, () => {
  selectedClass.value = classes1.value.get(selectedSemester.value)[0];
});
watch(selectedClass, () => {
  getNotice();
  getSubject();
});
const goWriteRef = (id: number) => {
  router.push('/professor/writeref/' + id);
};
const goAddSubject = (id: number) => {
  router.push('/professor/addsubject/' + id);
};
const goWriteNotice = (id: number) => {
  router.push('/professor/writenotice/' + id);
};
const goCourseDesc = (id: number) => {
  router.push('/professor/coursedesc/' + id);
};
const goNotice = (id: number) => {
  router.push('/professor/notice/8458/' + id);
};
const goSubject = (id: number) => {
  router.push('/professor/subject/8458/' + id);
};
const goRef = (id: number) => {
  router.push('/professor/reference/' + id);
};
const studentScore = ref([]);
const scoreData: { studentId: number; score: string }[] = [];
const students = [
  {
    studentId: 2018202048,
    studentName: '이민재',
    score: ''
  },
  {
    studentId: 2018202043,
    studentName: '이민재2',
    score: 'A+'
  }
];
const giveScore = () => {
  console.log(studentScore.value);
  console.log(scoreData);
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title row items-center">
          <div class="q-mr-md">담당 강의</div>

          <div class="select-box q-mr-md">
            <q-select color="main" v-model="selectedSemester" :options="semesters" dense />
          </div>

          <div class="select-box">
            <q-select color="main" v-model="selectedClass" :options="classes" dense />
          </div>
        </div>
      </div>
      <div class="board q-mt-sm">
        담당 교수 : <strong>이기훈 교수님</strong>
        <q-btn
          class="q-ml-md"
          color="kbrown"
          label="강의계획서 조회"
          size="md"
          dense
          @click="goCourseDesc(8458)"
        />
      </div>
      <div class="board q-mt-md">
        <div class="row items-center justify-between">
          <div class="title">자료실</div>
          <q-btn flat color="kbrown" label="글 작성" @click="goWriteRef(8458)" />
        </div>

        <q-separator color="#d1d1d1" size="2" />
        <q-list dense padding separator>
          <q-item
            v-for="(item, index) in references"
            :key="index"
            @click="goRef(item.id)"
            clickable
            v-ripple
          >
            <q-item-section>{{ item.title }}</q-item-section>
            <q-item-section>
              <div class="row justify-around items-center">
                {{ item.time }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
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
            <div class="row items-center justify-between">
              <div class="title">공지사항</div>
              <q-btn flat color="kbrown" label="글 작성" @click="goWriteNotice(8458)" />
            </div>

            <q-separator color="#d1d1d1" size="2" />
            <q-list dense padding separator>
              <q-item
                v-for="(item, index) in notices"
                :key="index"
                @click="goNotice(item.id)"
                clickable
                v-ripple
              >
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
            <div class="row items-center justify-between">
              <div class="title">과제</div>
              <q-btn flat color="kbrown" label="과제 추가" @click="goAddSubject(8458)" />
            </div>

            <q-separator color="#d1d1d1" size="2" />
            <q-list dense padding separator>
              <q-item
                v-for="(item, index) in subjects"
                :key="index"
                @click="goSubject(item.id)"
                clickable
                v-ripple
              >
                <q-item-section>{{ item.title }}</q-item-section>
                <q-item-section>
                  <div class="row justify-around items-center">~{{ item.deadline }} 까지</div>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
      <div class="board q-mt-md">
        <div class="row items-center justify-between">
          <div class="title q-mb-sm">성적 부여</div>
          <q-btn flat color="kbrown" label="부여하기" @click="giveScore()" />
        </div>
        <q-separator></q-separator>
        <q-list dense padding separator>
          <q-item
            v-for="(item, index) in students"
            :key="index"
            clickable
            v-ripple
            ref="studentScore"
          >
            <q-item-section>
              <div class="row items-center">
                <div class="col">
                  {{ item.studentId }}
                </div>
                <div class="col">
                  {{ item.studentName }}
                </div>
                <div class="col">부여된 점수 : {{ item.score }}</div>
              </div>
              <div class="row justify-center">
                <div class="q-gutter-sm">
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="A+"
                    label="A+"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="A"
                    label="A"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="B+"
                    label="B+"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="B"
                    label="B"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="C+"
                    label="C+"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="C"
                    label="C"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="D+"
                    label="D+"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="D"
                    label="D"
                  />
                  <q-radio
                    left-label
                    v-model="studentScore[index]"
                    @update:model-value="
                      () => {
                        scoreData.push({
                          studentId: item.studentId,
                          score: studentScore[index]
                        });
                      }
                    "
                    val="F"
                    label="F"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
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
