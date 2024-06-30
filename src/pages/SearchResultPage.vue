<script setup >
import {useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import { onMounted } from 'vue';
import qs from 'qs';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const { tags } = route.query;

const userList = ref([]);

// 页面初始化结束后执行
onMounted( async () => {
  const userListData = await myAxios.get('/tag/search/user',{
    params:{
      tagNameList: tags
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: "repeat" });
    },
    headers: {
      'Authorization': window.localStorage.getItem('token'),
    }
  }).then(function (response) {
    console.log('/tag/search/user success', response);
    return response.data?.data;
  }).catch(function (error) {
    console.error('/tag/search/user error', error);
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
  <van-empty v-if="!userList || userList.length < 1">搜索结果为空</van-empty>
</template>

<style scoped>

</style>