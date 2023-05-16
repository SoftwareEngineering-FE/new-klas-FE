<script setup lang="ts">
import { ref } from 'vue';
const selectedSemester = ref('2023년도 1학기');
const semesters = ['2023년도 1학기', '2023년도 2학기', '2022년도 1학기', '2022년도 2학기'];
const notices = [
  {
    title: '오늘 휴강',
    name: '소프트웨어공학',
    time: '2023-05-12',
    id: 1
  },
  {
    title: '내일도 휴강',
    name: '소프트웨어공학',
    time: '2023-05-13',
    id: 2
  }
];
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board">
        <div class="title">최근 공지사항</div>
        <q-separator color="#d1d1d1" size="2" />
            <q-list dense padding separator>
              <q-item v-for="(item, index) in notices" :key="index" clickable v-ripple>
                <q-item-section>{{ item.title }}</q-item-section>
                <q-item-section>
                  <div class="row justify-around items-center">
                    <div>{{ item.name }}</div>
                    <div>{{ item.time }}</div>
                  </div>
                </q-item-section>
              </q-item>
            </q-list>
      </div>
      <div class="board column items-center q-mt-md">
        <div class="select-box">
          <q-select
            color="main"
            v-model="selectedSemester"
            :options="semesters"
            label="학기"
            dense
          />
        </div>
        <div class="table q-mt-sm">
          <div class="row font-size-16">
            <div class="first td"></div>
            <div class="col td flex flex-center">월</div>
            <div class="col td flex flex-center">화</div>
            <div class="col td flex flex-center">수</div>
            <div class="col td flex flex-center">목</div>
            <div class="col td flex flex-center">금</div>
            <div class="col td flex flex-center">토</div>
          </div>
          <div class="row">
            <div class="first td flex flex-center">0</div>
            <div class="col td"></div>
            <div class="col td"></div>
            <div class="col td"><div class="class-2" v-ripple>asd</div></div>
            <div class="col td"></div>
            <div class="col td"></div>
            <div class="col td"></div>
          </div>
          <div class="row">
            <div class="first td flex flex-center">1</div>
            <div class="col td"></div>
            <div class="col td"></div>
            <div class="col td"></div>
            <div class="col td"></div>
            <div class="col td"></div>
            <div class="col td"></div>
          </div>
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
.class-1 {
  @include class;
  height: 59px;
}
.class-2 {
  @include class;
  height: 119px;
}
.class-3 {
  @include class;
  height: 179px;
}
.font-size-16 {
  font-size: 16px;
}
</style>
