<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const q = useQuasar();
const router = useRouter();
const postData = {
  title: '오늘 수업은 없습니다.',
  writer: '홍길동',
  date: '2023-05-12',
  content: '오늘 깜짝 이벤트로 수업이 없어져버렸어요~'
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">강의 공지사항</div>
        <q-separator></q-separator>
        <div class="post-head">
          <div class="post-title">{{ postData.title }}</div>
          <div class="row post-desc">
            <div class="desc">{{ postData.writer }}</div>
            <div class="desc">{{ postData.date }}</div>
          </div>
        </div>
        <div class="post-body">{{ postData.content }}</div>
        <q-separator></q-separator>
        <div class="post-foot row justify-end">
            <q-btn class="q-ma-sm" @click="router.back()" padding="3px 12px" color="kbrown" label="돌아가기" />
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
.post-head{
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    background-color: #f3f3f3;
    padding: 10px;
}
.post-title{
    font-size: 20px;
    font-weight: bold;
}
.post-body{
    padding: 20px 15px;
    font-size: 14px;
}
</style>
