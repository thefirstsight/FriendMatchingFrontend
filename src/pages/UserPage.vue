<template>
  <van-cell title="昵称" is-link to="/user/edit" :value="user.username"/>
  <van-cell title="账号" is-link to="/user/edit" :value="user.userAccount"/>
  <van-cell title="头像" is-link to="/user/edit">
    <img style="height: 48px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender', '性别', user.gender)"/>
  <van-cell title="电话" is-link to="/user/edit" :value="user.phone"/>
  <van-cell title="邮箱" is-link to="/user/edit" :value="user.email"/>
  <van-cell title="星球编号" is-link to="/user/edit" :value="user.planetCode"/>
  <van-cell title="注册时间" is-link to="/user/edit" :value="user.createTime.toDateString()"/>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  username: '晨鸣',
  userAccount: '梦屿千寻',
  avatarUrl: 'https://th.bing.com/th/id/OIP.lRBR1U60Uicd8CzECDVTJQHaGh?rs=1&amp;pid=ImgDetMain',
  gender: '男',
  phone: '12345678',
  email: '1931517825@qq.com',
  planetCode: '1',
  createTime: new Date()
};

const router = useRouter();

const toEdit = (editKey: string, editName:string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    params: {
      a: 1
    },
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

</script>


<style scoped>
</style>