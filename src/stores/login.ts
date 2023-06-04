import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
  const isLogin = ref(false);
  const loginId = ref<number>();
  function setLogin(bool: boolean) {
    isLogin.value = bool;
  }
  function setId(id: number) {
    loginId.value = id;
  }
  return { isLogin,loginId, setLogin, setId };
});
