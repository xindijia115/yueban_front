<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";


const router = useRouter();

const account = ref('');
const password = ref('');
const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    account: account.value,
    password: password.value,
  })
  console.log(res, '用户登录');
  if(res.data.code === 0){
    window.localStorage.setItem("token", res.data.data.token);
    console.log(res.data.data.token);
    showToast('登录成功');
    router.replace('/');
  } else {
    showToast('登录失败');
  }
};



</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="account"
          name="account"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>

</template>



<style scoped>

</style>