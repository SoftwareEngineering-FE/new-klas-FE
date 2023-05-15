<script setup lang="ts">
import { ref } from 'vue';
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">각 학기별 성적</div>
        <q-separator color="#d1d1d1" />
      </div>
      <div class="board column items-center q-mt-md"></div>
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
.table {
  width: 100%;
  border-right: 1px solid #d1d1d1;
  border-bottom: 1px solid #d1d1d1;
}
.first {
  width: 20px;
}
.td {
  position: relative;
  border-left: 1px solid #d1d1d1;
  border-top: 1px solid #d1d1d1;
  height: 60px;
}

.font-size-16 {
  font-size: 16px;
}
</style>
