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
const inputTitle = ref('');
const inputFile = ref();
const router = useRouter();
const title = ref('');
const writer = ref('');
const time = ref('');
const deadline = ref('');
const className = ref('');
const content = ref('');
const getData = async () => {
  await axios.get('http://localhost:8080/api/assignment/' + props.id).then((res) => {
    title.value = res.data.title;
    writer.value = res.data.writer;
    time.value = res.data.time;
    className.value = res.data.className;
    content.value = res.data.content;
    deadline.value = res.data.deadline;
  });
};
onMounted(() => {
  getData();
});
const submit = async () => {
  const data = new FormData();
  console.log(inputFile.value);
  data.append('studentId', login.loginId + '');
  data.append('postId', props.id + '');
  data.append('title', title.value);
  data.append('file', inputFile.value);
  await axios
    .post('http://localhost:8080/file/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">{{ className }} 과제</div>
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
        <div class="board q-mt-md q-pa-md">
          <q-input outlined v-model="inputTitle" placeholder="제목" dense color="kbrown" />
          <q-input
            class="q-mt-xs"
            @update:model-value="
              (val) => {
                inputFile = val;
              }
            "
            model-value=""
            color="kbrown"
            multiple
            filled
            type="file"
          />
        </div>
        <div class="post-foot row justify-end">
          <q-btn
            class="q-ma-sm"
            @click="submit"
            padding="3px 12px"
            color="kbrown"
            label="제출하기"
          />
          <q-btn
            class="q-ma-sm text-black"
            flat
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
