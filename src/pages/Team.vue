<script setup >
import {useRouter} from "vue-router"
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import { onMounted } from 'vue';
import TeamCardList from "../components/TeamCardList.vue";


const router = useRouter();
const teamList = ref([]);

const searchText = ref('');
const onSearch = async (val) => {
  const res = await myAxios.post('/team/search/teams', {
    "currentPage": 1,
    "pageSize": 10,
    "searchText": val,
  }, {
    headers: {
      Authorization: window.localStorage.getItem("token"),
    }
  })
  if (res.data.data) {
    teamList.value = res.data.data;
  }
}

const doCreateTeam = () => {
  router.push({
    path: "/team/add"
  });
}
// 页面加载时触发
onMounted(async () => {
  const res = await myAxios.get("/team",{
    headers: {
      'Authorization': window.localStorage.getItem("token"),
    }
  });
  if (res.data.code === 0) {
    showToast("请求成功")
  } else {
    showToast("获取信息失败");
  }

  if (res.data.data) {
    teamList.value = res.data.data;
  }

})
</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch"/>
    <van-button type="primary" @click="doCreateTeam">创建队伍</van-button>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>