import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
  const isLogin = ref(true);
  const userType = ref('');
  function setLogin(bool: boolean) {
    isLogin.value = bool;
  }
  function setUserType(string: string) {
    userType.value = string;
  }
  return { isLogin, setLogin, setUserType };
});
