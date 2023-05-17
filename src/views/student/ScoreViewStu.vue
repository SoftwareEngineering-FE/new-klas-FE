<script setup lang="ts">
import { ref } from 'vue';
import type { QTableProps } from 'quasar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
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
  { name: 'gradeAverage', label: '평균 학점', field: 'gradeAverage', sortable: true }
];
const rows = [
  {
    name: '2018학년도 1학기',
    totalGrade: 19,
    gradeAverage: 4.2
  },
  {
    name: '2018학년도 2학기',
    totalGrade: 18,
    gradeAverage: 4.0
  }
];
let labels :string[] = [];
let datasets = [
  {
    label: '평균 학점',
    backgroundColor: '#555555',
    data : new Array()
  }
];
rows.forEach((row) => {
  labels.push(row.name.split(' ')[0] + '\n' + row.name.split(' ')[1]);
  datasets[0].data.push(row.gradeAverage)
});
let chartData = {
  labels: labels,
  datasets: datasets
}
let charOptions = {
  scales:{
    y:{
      min:2.0,
      max:4.5
    }
  }
}
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
        <Line :data="chartData" :options="charOptions"/>
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
