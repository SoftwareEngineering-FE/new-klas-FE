import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
  const isLogin = ref(true);
  function setLogin(bool: boolean) {
    isLogin.value = bool;
  }
  return { isLogin, setLogin };
});
