<script setup lang="ts">
import { ref } from 'vue';
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
const inputTitle = ref('');
const inputContext = ref('');
const inputDeadline = ref('');
const inputTime = ref('');
const submit = async () => {
  await axios
    .post('http://localhost:8080/write/post', {
      subjectId: props.id,
      code: 3,
      title: inputTitle.value,
      content: inputContext.value,
      deadline: inputDeadline.value + ' ' + inputTime.value + ':00'
    })
    .then((res) => {
      router.back();
    });
};
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title q-mb-sm">과제 추가</div>
        <q-separator></q-separator>
        <q-input color="kbrown" class="q-my-md" outlined v-model="inputTitle" label="제목" dense />
        <q-input
          color="kbrown"
          class="q-mb-xs"
          v-model="inputDeadline"
          filled
          type="date"
          hint="제출 기한 날짜"
          dense
        />
        <q-input
          class="q-mb-md"
          v-model="inputTime"
          filled
          type="time"
          hint="제출 마감 시간"
          dense
        />
        <q-input color="kbrown" v-model="inputContext" label="내용" filled type="textarea" />

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
</style>
