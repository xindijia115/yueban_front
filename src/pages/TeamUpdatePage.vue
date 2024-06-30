<script setup lang="ts">
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute();
const teamId = route.query.teamId;
const minDate = new Date();
const result = ref('');
const showPicker = ref(false);
const initFormData = {
  "name": "",
  "description": "",
  "expireTime": "",
  "maxNum": 5,
  "password": "",
  "status": 0
}
// 用户填写的表单数据
const team = ref({...initFormData});

onMounted(async () => {
  const res = await myAxios.get('/team/one', {
    params:{
      teamId
    },
    headers: {
      'Authorization': window.localStorage.getItem("token"),
    }
  });
  if (res.data.code === 0) {
    team.value = res.data.data;
  } else {
    showToast('获取用户信息失败');
  }
})

/**
 * 修改队伍信息
 */
const onSubmit = async () => {
  const res = await myAxios.put('/team',{
    "id": teamId,
  },{
    headers: {
      Authorization: window.localStorage.getItem("token"),
    }
  })
  if(res.data.code === 0){
    showToast("修改成功")
  } else {
    showToast('修改失败:' + res.data.msg);
  }
}

const onConfirm = ({ selectedValues }) => {
  result.value = selectedValues.join('/');
  showPicker.value = false;
};


</script>

<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="team.name"
            name="account"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="team.description"
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
            :placeholder=team.expireTime
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
            <van-stepper v-model="team.maxNum" max="20"/>
          </template>
        </van-field>
        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="team.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="team.status === '1'"
            v-model="team.password"
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