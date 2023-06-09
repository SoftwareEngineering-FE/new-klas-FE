<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const q = useQuasar();
const router = useRouter();
const postData = {
  className: '소프트웨어공학',
  classDesc: '앞으로 강의 진행은 ,,,'
};
type dayType = {
  [key: number]: string;
};
const day: dayType = { 0: '월', 1: '화', 2: '수', 3: '목', 4: '금', 5: '토', 6: '일' };
const when = ref('');
const className = ref('');
const professor = ref('');
const desc = ref('');
const countStudent = ref(0);
const getDesc = async (classId: string) => {
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
onMounted(() => {
  getDesc(props.id);
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <q-separator></q-separator>
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
        <div class="post-foot row justify-end">
          <q-btn
            class="q-ma-sm"
            @click="router.push('/professor/coursedesc/update/' + props.id)"
            padding="3px 12px"
            color="kbrown"
            label="수정하기"
          />
          <q-btn
            class="q-ma-sm"
            @click="router.back()"
            padding="3px 12px"
            color="kbrown"
            label="돌아가기"
          />
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
</style>
