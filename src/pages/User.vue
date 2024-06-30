<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

// const user = {
//   id: 1,
//   username: 'DJ',
//   account: '20210401628',
//   avatarUrl: 'https://xdj.gwcampus.cn/img/2d0c2d0be5a75deb1534824d66eb0253.jpg',
//   gender: '男',
//   phone: '17825791378',
//   email: '1179394406@gmail.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();

onMounted(async () => {
  const res = await myAxios.get('/user/current', {
    headers: {
      'Authorization': window.localStorage.getItem("token"),
    }
  });
  if (res.data.code === 0) {
    user.value = res.data.data;
  } else {
    showToast('获取用户信息失败');
  }
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}


</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username"
              @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账号" :value="user.account"/>
    <van-cell title="头像" is-link to="/user/edit">
      <img style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender"
              @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="学院" :value="user.major"/>
<!--    <van-cell title="注册时间" :value="user.createTime"/>-->
  </template>
</template>


<style scoped>

</style>