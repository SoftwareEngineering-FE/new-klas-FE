<script setup lang="ts">
import { ref } from 'vue';
import type { QTableProps } from 'quasar';
const columns: QTableProps['columns'] = [
  {
    name: 'name',
    required: true,
    label: '학기',
    align: 'left',
    field: 'name',
    sortable: true
  },
  { name: 'totalGrade', align: 'center', label: '취득 학점', field: 'totalGrade', sortable: true },
  { name: 'gradeAverage', label: '평균 평점', field: 'gradeAverage', sortable: true }
];
const rows = [
  {
    name: '2018학년도 1학기',
    totalGrade: 19,
    gradeAverage: 4.2
  },
  {
    name: '2018학년도 1학기',
    totalGrade: 19,
    gradeAverage: 4.2
  },
];
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">각 학기별 성적</div>
        <q-table
          flat
          bordered
          title=""
          dense
          :rows="rows"
          :columns="columns"
          :rows-per-page-options="[0]"
          row-key="name"
        />
        
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
