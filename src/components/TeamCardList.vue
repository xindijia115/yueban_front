<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constant/team.ts";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}
const props = defineProps<TeamCardListProps>();
const router = useRouter();

/**
 * 加入队伍
 * @param teamId
 */
const doJoinTeam = async (teamId: number) => {
  const res = await myAxios.post('/team/join',{
    teamId: teamId,
  },{
    headers: {
      Authorization: window.localStorage.getItem("token"),
    }
  })
  if(res.data.code === 0){
    showToast("加入成功")
  } else {
    showToast('加入失败:' + res.data.msg);
  }
}

/**
 * 修改队伍
 * @param teamId
 */
const doUpdateTeam =  (teamId: number) => {
  router.push({
    path: '/team/update',
    query: {
      "teamId": teamId,
    }
  })
}


const user = ref();

onMounted(async () => {
  const res = await myAxios.get('/user/current', {
    headers: {
      'Authorization': window.localStorage.getItem("token"),
    }
  });
  if (res.data.code === 0) {
    user.value = res.data.data;
    console.log(user.value)
  } else {
    showToast('获取用户信息失败');
  }
})

</script>

<template>
  <van-card
      v-for="team in props.teamList"
      thumb="https://xdj.gwcampus.cn/img/ikun.jpg"
      :desc="team.description"
      :title="`${team.name}`"
  >
    <template #bottom>
      <div>
        {{ '最大人数：' + team.maxNum }}
      </div>
      <div v-if="team.expireTime">
        {{ '过期时间：' + team.expireTime }}
      </div>
      <div v-if="team.createTime">
        {{ '创建时间：' + team.createTime }}
      </div>
    </template>
    <template #tags>
      <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
        {{ teamStatusEnum[team.status] }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="small" type="primary" plain @click="doJoinTeam(team.id)">加入队伍</van-button>
      <van-button v-if="team.userId === user?.id" size="small" type="primary" plain @click="doUpdateTeam(team.id)">修改队伍</van-button>
    </template>
  </van-card>
</template>

<style scoped>

</style>