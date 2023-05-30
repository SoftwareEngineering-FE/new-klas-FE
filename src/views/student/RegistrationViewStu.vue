<script setup lang="ts">
import { ref } from 'vue';
const classes = [
  {
    classId: 8458,
    className: '소프트웨어공학',
    professor: '이기훈',
    when: [
        { 
            day: 0, // 월 0 화 1 수 2 ...
            time: [0, 1] // 0교시 1교시
        },
        { 
            day: 1, 
            time: [0, 1] 
        },
    ],
  },
  {
    classId: 8458,
    className: '소프트웨어공학',
    professor: '이기훈',
    when: [
        { 
            day: 3, // 월 0 화 1 수 2 ...
            time: [0, 1] // 0교시 1교시
        },
        { 
            day: 4, 
            time: [0, 1] 
        },
    ],
  }
];
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">수강신청</div>
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
@mixin class {
  cursor: pointer;
  font-size: 12px;
  background-color: rgb(240, 240, 136);
  position: absolute;
  width: 100%;
  z-index: 1;
}
.font-size-16 {
  font-size: 16px;
}
</style>
