import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('login', () => {
  const isLogin = ref(false);
  const loginId = ref<number>();
  const semester = ref('');
  const className = ref('');
  function setLogin(bool: boolean) {
    isLogin.value = bool;
  }
  function setId(id: number) {
    loginId.value = id;
  }
  function setClass(id: string) {
    className.value = id;
  }
  function setSemester(id: string) {
    semester.value = id;
  }
  return { isLogin, loginId, className, semester, setSemester, setLogin, setId, setClass };
});
