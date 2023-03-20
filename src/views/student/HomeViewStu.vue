<script setup lang="ts"></script>
<template>
  <div class="background">
    <div class="notice board">
      <div class="title">최근 공지사항</div>
      <q-separator color="#d1d1d1" />
      <q-list dense padding class="rounded-borders">
        <q-item clickable v-ripple>
          <q-item-section> 휴강 공지 </q-item-section>
          <q-item-section
            ><div class="row justify-around items-center">
              <div>강의명</div>
              <div>날짜</div>
            </div>
          </q-item-section>
        </q-item>

        <q-separator color="#d1d1d1" inset />
        <q-item clickable v-ripple>
          <q-item-section> 제목 </q-item-section>
          <q-item-section
            ><div class="row justify-around items-center">
              <div>강의명</div>
              <div>날짜</div>
            </div>
          </q-item-section>
        </q-item>

        <q-separator color="#d1d1d1" inset />
        <q-item clickable v-ripple>
          <q-item-section> 제목 </q-item-section>
          <q-item-section
            ><div class="row justify-around items-center">
              <div>강의명</div>
              <div>날짜</div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<style scoped lang="scss">
.background {
  background-color: #f3f3f3;
  padding: 15px 20px;
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
</style>
