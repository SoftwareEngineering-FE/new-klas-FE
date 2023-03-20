<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header bordered class="bg-main text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-img class="logo" src="/svg/nemo-logo.svg" width="140px" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list bordered separator>
        <q-item clickable v-ripple to="/student">
          <q-item-section>홈</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/student">
          <q-item-section>강의 종합</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/student">
          <q-item-section>성적 결과</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/student">
          <q-item-section>수강 신청</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style scoped lang="scss">
.logo {
  margin: 0 auto;
}
</style>
