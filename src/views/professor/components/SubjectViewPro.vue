<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useLoginStore } from '../../../stores/login';
const login = useLoginStore();
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const q = useQuasar();
const router = useRouter();
const subjectData = {
  title: '3차 프로젝트',
  writer: '홍길동',
  date: '2023-05-12',
  deadline: '2023-07-30',
  className: '소프트웨어공학',
  content: '학사 관리 시스템을 구현해보시오.'
};
const title = ref('');
const writer = ref('');
const time = ref('');
const deadline = ref('');
const className = ref('');
const content = ref('');
const subjects = ref<any[]>([]);
const getData = async () => {
  await axios
    .get('http://localhost:8080/professor/read/assignment?postId=' + props.id)
    .then((res) => {
      console.log(res.data);
      title.value = res.data.title;
      writer.value = res.data.writer;
      time.value = res.data.time;
      className.value = res.data.className;
      content.value = res.data.content;
      deadline.value = res.data.deadline;
      subjects.value = res.data.files;
    });
};
const deletePost = async () => {
  await axios.delete('http://localhost:8080/delete/post?postId=' + props.id).then((res) => {
    router.back();
  });
};
const goUpdateSubject = () => {
  router.push('/professor/updatesubject/' + props.id);
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">{{ subjectData.className }} 과제</div>
        <q-separator></q-separator>
        <div class="post-head">
          <div class="post-title">{{ title }}</div>
          <div class="row">
            <div class="q-pr-md">작성자 : {{ writer }}</div>
            <div class="q-pr-md">작성일 : {{ time }}</div>
            <div class="">기한 : ~{{ deadline }}</div>
          </div>
        </div>
        <div class="post-body">{{ content }}</div>
        <q-separator></q-separator>
        <div class="post-foot row justify-end">
          <q-btn
            class="q-ma-sm"
            @click="goUpdateSubject()"
            padding="3px 12px"
            color="kbrown"
            label="수정"
          />

          <q-btn
            class="q-ma-sm"
            @click="deletePost()"
            padding="3px 12px"
            color="kbrown"
            label="삭제"
          />
          <q-btn
            class="q-ma-sm"
            @click="router.back()"
            padding="3px 12px"
            color="kbrown"
            label="돌아가기"
          />
        </div>
        <q-separator></q-separator>
      </div>
      <div class="board q-mt-md">
        <div class="title">제출된 파일</div>
        <q-separator></q-separator>
        <table class="q-mb-sm">
          <colgroup>
            <col width="10%" />
            <col width="3%" />
            <col width="5%" />
          </colgroup>
          <thead>
            <tr>
              <th class="ths">학번</th>
              <th class="ths">제목</th>
              <th class="ths">파일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subject, index) in subjects" :key="index">
              <td>{{ subject.studentId }}</td>
              <td>{{ subject.title }}</td>
              <td>
                <a :href="subject.link">{{ subject.fileName }}</a>
              </td>
            </tr>
          </tbody>
        </table>
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
