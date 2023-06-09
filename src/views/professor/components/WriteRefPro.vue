<script setup lang="ts">
import { ref } from 'vue';
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
const inputTitle = ref('');

const inputFile = ref();
const inputContext = ref('');
const submit = async () => {
  console.log(props.id);
  await axios
    .post('http://localhost:8080/write/post', {
      subjectId: props.id,
      code: 1,
      title: inputTitle.value,
      content: inputContext.value
    })
    .then(async (res) => {
      let postId = res.data;
      const data = new FormData();
      data.append(
        'dto',
        new Blob(
          [JSON.stringify({ postId: postId, studentId: login.loginId, title: inputTitle.value })],
          {
            type: 'application/json'
          }
        )
      );
      data.append('file', inputFile.value);
      await axios
        .post('http://localhost:8080/file/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => {})
        .catch((err) => {
          console.log('파일 첨부 에러', err);
        });
      router.back();
    })
    .catch((err) => {
      console.log('post작성 에러', err);
    });
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">자료실 게시글 작성</div>
        <q-separator></q-separator>
        <q-input color="kbrown" class="q-mb-md" outlined v-model="inputTitle" label="제목" dense />
        <q-input color="kbrown" v-model="inputContext" label="내용" filled type="textarea" />
        <q-input
          class="q-mt-xs"
          @update:model-value="
              (val:any) => {
                inputFile = val[0];
              }
            "
          model-value=""
          color="kbrown"
          multiple
          filled
          type="file"
        />
        <div class="post-foot row justify-end">
          <q-btn class="q-ma-sm" @click="submit()" padding="3px 12px" color="kbrown" label="작성" />
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
