<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length===0">请选择标签</div>
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>

</template>

<script setup>
import {ref} from 'vue';
import {Toast} from 'vant';
import {useRouter} from "vue-router";

const searchText = ref('');
const router = useRouter();
/**
 * 已选中的标签
 *
 * @type {Ref<UnwrapRef<*[]>>}
 */
const activeIds = ref([]);
const activeIndex = ref(0);
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
    ],
  },
];

const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query:{
      tags: activeIds.value
    }
  })
}

let tagList = ref(originTagList);

/**
 * 删除已选标签
 *
 * @param tag
 */
const doClose = (tag) =>{
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/**
 * 搜索过滤
 * 关键字查询
 * 要将子级数据扁平化，再进行过滤
 *
 * @param val
 */
const onSearch = (val) =>{
  // console.log(tagList.flatMap(parentTag => parentTag.children));
  tagList.value = originTagList.map(parentTag => {
    const tempChildren = [...parentTag.children];   //创建一个名为tempchildren的新数组
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
    return tempParentTag;
  })
};

const onCancel = () =>{
  searchText.value = '';
  tagList.value = originTagList;
}

</script>


<style scoped>
</style>