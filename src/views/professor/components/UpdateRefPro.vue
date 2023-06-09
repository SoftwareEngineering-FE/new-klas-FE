<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';
const props = defineProps({
  classId: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
});
const q = useQuasar();
const router = useRouter();
const inputTitle = ref('');
const inputContext = ref('');
const submit = async () => {
  await axios
    .put('http://localhost:8080/update/post', {
      postId: props.id,
      title: inputTitle.value,
      content: inputContext.value
    })
    .then((res) => {
      router.back();
    })
    .catch((err) => {
      console.log(err);
    });
};
const getData = async () => {
  await axios.get('http://localhost:8080/api/data/detail/' + props.id).then((res) => {
    inputTitle.value = res.data.title;
    inputContext.value = res.data.content;
  });
};
onMounted(() => {
  getData();
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">자료실 게시글 수정</div>
        <q-separator></q-separator>
        <q-input color="kbrown" class="q-mb-md" outlined v-model="inputTitle" label="제목" dense />
        <q-input color="kbrown" v-model="inputContext" label="내용" filled type="textarea" />

        <div class="post-foot row justify-end">
          <q-btn class="q-ma-sm" @click="submit()" padding="3px 12px" color="kbrown" label="수정" />
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
