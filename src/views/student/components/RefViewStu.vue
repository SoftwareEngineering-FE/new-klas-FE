<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});
const title = ref('');
const content = ref('');
const writer = ref('');
const time = ref('');
const fileName = ref('');
const fileLink = ref('');
const getData = async () => {
  await axios.get('http://localhost:8080/api/data/detail/' + props.id).then((res) => {
    console.log(res.data);
    title.value = res.data.title;
    content.value = res.data.content;
    writer.value = res.data.writer;
    time.value = res.data.time;

    if (res.data.result !== -1) {
      fileName.value = res.data.fileName;
      fileLink.value = res.data.link;
    }
  });
};
const q = useQuasar();
const router = useRouter();
const postData = {
  title: '1주차 강의 자료',
  writer: '홍길동',
  date: '2023-05-12',
  content: '1주차 강의 자료입니다.'
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">강의 자료실</div>
        <q-separator></q-separator>
        <div class="post-head">
          <div class="post-title">{{ title }}</div>
          <div class="row">
            <div class="q-pr-md">작성자 : {{ writer }}</div>
            <div class="q-pr-md">작성일 : {{ time }}</div>
          </div>
          <div class="">
            첨부 파일 : <a :href="fileLink" target="_blank">{{ fileName }}</a>
          </div>
        </div>
        <div class="post-body">{{ content }}</div>
        <q-separator></q-separator>
        <div class="post-foot row justify-end">
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
