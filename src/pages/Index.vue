<script setup >
import {useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import { onMounted } from 'vue';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);

// 页面初始化结束后执行
onMounted( async () => {
  const userListData = await myAxios.post('/user/recommend',{
    "currentPage": 1,
    "pageSize": 10,
  },{
    headers: {
      Authorization: window.localStorage.getItem("token"),
    }
  }).then(function (response) {
    console.log('/user/recommend success', response);
    // showToast('请求成功')
    console.log(response)
    return response.data?.data;
  }).catch(function (error) {
    console.error('/user/recommend error', error);
    showToast('请求失败')
  })
  if (userListData) {
    userList.value = userListData;
  }
})



console.log(route)


</script>

<template>
  <user-card-list :user-list="userList"/>
  <div>
    <br>
  </div>
  <van-empty v-if="!userList || userList.length < 1">系统出错啦</van-empty>
</template>

<style scoped>

</style>