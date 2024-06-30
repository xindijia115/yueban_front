<script setup lang="ts">
import {ref} from 'vue';
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {useRouter} from "vue-router";
// 展示日期选择器
const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 5,
  "password": "",
  "status": 0
}

const router = useRouter();
// 用户填写的表单数据
const addTeamData = ref({...initFormData});
const showPicker = ref(false);

const result = ref('');

const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join('/');
  showPicker.value = false;
};

const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  await myAxios.post('/team',{
    "name": postData.name,
    "description": postData.description,
    "expireTime": result.value,
    "maxNum": postData.maxNum,
    "password": postData.password,
    "status": postData.status,
  },{
    headers: {
      Authorization: window.localStorage.getItem("token"),
    }
  }).then(function (response) {
    console.log('/team success', response);
    showToast('创建成功')
    console.log(response)
    router.push({
      path: '/team',
      replace: true
    })
  }).catch(function (error) {
    console.error('/team error', error);
    showToast('请求失败')
  })
}

const minDate = new Date();
</script>

<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="account"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            v-model="result"
            is-link
            readonly
            name="datePicker"
            label="时间选择"
            placeholder="请输入创建队伍的时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker
              @confirm="onConfirm"
              @cancel="showPicker = false"
              :min-date="minDate"/>
        </van-popup>

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="20"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="addTeamData.status === '1'"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密码"
            placeholder="队伍密码"
            :rules="[{ required: true, message: '请填写队伍密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>

</style>