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

    <q-drawer show-if-above v-model="leftDrawerOpen" :width="210" side="left" bordered>
      <q-list separator>
        <q-item clickable v-ripple to="/admin" class="text-black">
          <q-item-section avatar>
            <q-icon name="rule" />
          </q-item-section>
          <q-item-section>강의 관리</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/admin/users" class="text-black">
          <q-item-section avatar>
            <q-icon name="supervisor_account" />
          </q-item-section>
          <q-item-section>유저 관리</q-item-section>
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
