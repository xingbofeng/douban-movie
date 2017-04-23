<template>
  <div class="container">
    <search-input />
    <div class="searchItems">
      <search-item
        v-for="(item, index) in tags"
        :key="index"
        :tag="item.tag"
        :color="item.color"
      />
    </div>
    <page-end />
  </div>
</template>

<script>
import SearchInput from '../components/Search/SearchInput';
import SearchItem from '../components/Search/SearchItem';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'Search',

  components: {
    SearchInput,
    SearchItem,
    PageEnd,
  },

  data() {
    return {
      tags: [
        { tag: '经典', color: 'rgb(35, 132, 232)' },
        { tag: '冷门佳片', color: 'rgb(122, 106, 219)' },
        { tag: '豆瓣高分', color: 'rgb(159, 120, 96)' },
        { tag: '动作', color: 'rgb(230, 70, 126)' },
        { tag: '喜剧', color: 'rgb(42, 184, 204)' },
        { tag: '爱情', color: 'rgb(244, 143, 46)' },
        { tag: '悬疑', color: 'rgb(159, 120, 96)' },
        { tag: '恐怖', color: 'rgb(87, 116, 197)' },
        { tag: '科幻', color: 'rgb(89, 108, 221)' },
        { tag: '治愈', color: 'rgb(225, 100, 77)' },
        { tag: '文艺', color: 'rgb(64, 207, 169)' },
        { tag: '歌剧', color: 'rgb(64, 207, 169)' },
        { tag: '成长', color: 'rgb(66, 189, 86)' },
        { tag: '动画', color: 'rgb(230, 70, 126)' },
        { tag: '华语', color: 'rgb(225, 100, 77)' },
        { tag: '欧美', color: 'rgb(87, 116, 197)' },
        { tag: '韩国', color: 'rgb(35, 132, 232)' },
        { tag: '日本', color: 'rgb(159, 120, 96)' },
      ],
    };
  },
};
</script>

<style scoped>
.searchItems {
  margin-top: 0.6rem;
}
</style>
