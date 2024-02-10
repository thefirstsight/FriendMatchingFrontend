<template>
  <van-card v-for="user in userList"
      :desc="user.profile"
      :title="`${user.userName} (${user.planetCode})`"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px; margin-top: 8px">
        {{ tag }}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
</template>
<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";
import qs from "qs";

const route = useRoute();
const {tags} = route.query;
const userList = ref([]);

const mockUser = ref({
  id: 1,
  userName: 'tianber',
  userAccount: 'tianber',
  profile: 'tianber的个人简介，全栈工程师，加油加油加油！！！！！',
  gender: '男',
  phone: '234234',
  email: '324242342@qq.com',
  planetCode: '981',
  avatar: 'https://img1.baidu.com/it/u=1645832847,2375824523&fm=253&fmt=auto&app=138&f=JPEG?w=480&h=480',
  createTime: new Date().toDateString()
})

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: params => {
        // return qs.stringify(params, {arrayFormat:'repeat'})
        return qs.stringify(params, {indices:false})
      }
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        Toast.success(response);
        return response.data?.data;   //避免数据为null或undefined报错
      })
      .catch(function (error) {
        console.error('/user/search/tags error', error);
        Toast.fail('请求失败');
      })
  if(userListData){
    userListData.forEach(user => {
      if(user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
    if(userList.value)  console.log(userList.value);
  }
})
</script>

<style scoped>

</style>