<template>
  <van-nav-bar
      title="标题"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
    </van-nav-bar>

  <div id = "content">
    <router-view />
  </div>

  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>


</template>

<script setup >
import {showToast} from "vant";
import {useRouter} from 'vue-router'

const router = useRouter();

const onClickLeft = () => {
  router.back();
};

const onClickRight = () => {
  router.push('/search')
};


 // const onChange = () => showToast();

</script>

<style scoped>
#content{
  padding-bottom: 50px;
}
</style>