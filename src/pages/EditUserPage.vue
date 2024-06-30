<script setup lang="ts">
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showToast} from "vant";

const route = useRoute();
const router = useRouter();
console.log(route.query)

const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue,

})
const onSubmit = async () => {
  const res = await myAxios.post('/user/update', {
        [editUser.value.editKey as string]: editUser.value.currentValue,
      },
      {
        headers: {
          Authorization: window.localStorage.getItem("token"),
        }
      })
  if (res.data.code === 0) {
    showToast('修改成功');
    router.back();
  } else {
    showToast('修改失败');
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-field
        v-model="editUser.currentValue as string"
        :name="editUser.editKey as string"
        :label="editUser.editName as string"
        :placeholder="`请输入${editUser.editName}`"
    />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>


<style scoped>

</style>