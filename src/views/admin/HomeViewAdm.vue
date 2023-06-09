<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
const users = ref([]);
const getUsers = async () => {
  await axios
    .get('http://localhost:8080/api/admin/user/1111')
    .then((res) => {
      users.value = res.data.users;
    })
    .catch((err) => {
      console.log(err);
    });
};
const deleteUser = async (id: number) => {
  await axios.delete('http://localhost:8080/api/admin/user/1111/' + id).then(() => {
    getUsers();
  });
};
onMounted(() => {
  getUsers();
});
</script>
<template>
  <div class="background">
    <div class="wrapper">
      <div class="board q-mb-sm">
        <div class="table">
          <table class="q-mb-s">
            <colgroup>
              <col width="1%" />
              <col width="5%" />
              <col width="5%" />
              <col width="5%" />
              <col width="5%" />
            </colgroup>
            <thead>
              <tr>
                <th class="ths">삭제</th>
                <th class="ths">학과</th>
                <th class="ths">종류</th>
                <th class="ths">이름</th>
                <th class="ths">학번</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td>
                  <q-btn
                    flat
                    color="kbrown"
                    icon="delete"
                    dense
                    @click="deleteUser(user.studentId)"
                  />
                </td>
                <td>{{ user.department }}</td>
                <td>{{ user.role }}</td>
                <td>
                  {{ user.name }}
                </td>
                <td>
                  {{ user.studentId }}
                </td>
              </tr>
            </tbody>
          </table>
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
.post-head {
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  background-color: #f3f3f3;
  padding: 10px;
}
.post-title {
  font-size: 20px;
  font-weight: bold;
}
.post-body {
  padding: 20px 15px;
  font-size: 14px;
}
.select-box {
  width: 200px;
}
table {
  border-collapse: collapse;
  border-top: 2px solid gray;
}
th {
  background: #efe3e3;
}
td {
  text-align: center;
}
.ths {
  border-bottom: 1px solid gray;
}
table {
  border-collapse: collapse;
  border-top: 2px solid gray;
}
th {
  background: #efe3e3;
}
td {
  text-align: center;
}
.ths {
  border-bottom: 1px solid gray;
}
</style>
