<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
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
const goUpdateSubject = (classId: number, id: number) => {
  router.push('/professor/updatesubject/' + classId + '/' + id);
};
const submit = () => {};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">{{ subjectData.className }} 과제</div>
        <q-separator></q-separator>
        <div class="post-head">
          <div class="post-title">{{ subjectData.title }}</div>
          <div class="row">
            <div class="q-pr-md">작성자 : {{ subjectData.writer }}</div>
            <div class="q-pr-md">작성일 : {{ subjectData.date }}</div>
            <div class="">기한 : ~{{ subjectData.deadline }}</div>
          </div>
        </div>
        <div class="post-body">{{ subjectData.content }}</div>
        <div class="post-foot row justify-end">
          <q-btn
            class="q-ma-sm"
            @click="goUpdateSubject(84458, 1)"
            padding="3px 12px"
            color="kbrown"
            label="수정"
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
