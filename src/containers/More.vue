<template>
  <div class="more">
    <top-header />
    <main>
      <h1>{{ this.$route.params.title }}</h1>
      <div class="MovieItems">
        <div
          class="movieItemContainer"
          v-for="item in currentSeeMore.subjects"
        >
          <movie-item
            :key="item.id"
            :detail="item"
          />
        </div>
      </div>
    </main>
    <page-end />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import PageEnd from '../components/Common/PageEnd';
import MovieItem from '../components/Common/MovieItem';

export default {
  name: 'More',

  components: {
    TopHeader,
    PageEnd,
    MovieItem,
  },

  data() {
    return {
      requestFlag: true, // 是否请求接口
    };
  },

  computed: mapState({
    currentSeeMore(state) {
      return state.more.currentSeeMore[`${this.$route.params.title}`];
    },
  }),

  created() {
    window.addEventListener('scroll', this.scrolling);
  },

  destroyed() {
    window.removeEventListener('scroll', this.scrolling);
  },

  watch: {
    // watch currentSeeMore的目的是，在拿到数据之后可以再次请求后端
    currentSeeMore() {
      this.requestFlag = true;
    },
  },

  methods: {
    ...mapActions(['getMoreData']),
    scrolling() {
      // scrolling函数用于作函数节流
      if (this.scrollFlag) {
        return;
      }
      this.scrollFlag = true;
      setTimeout(() => {
        this.handleScroll();
        this.scrollFlag = false;
      }, 20);
    },

    handleScroll() {
      // 函数的作用是滚动加载电影详情信息
      // 判断是否为请求后台中的状态，如果是则返回
      const { start, count, total } = this.currentSeeMore;
      if (!this.requestFlag) {
        return;
      }
      // 不同浏览器top展现会不一致
      let top = window.document.documentElement.scrollTop;
      if (top === 0) {
        top = document.body.scrollTop;
      }
      const clientHeight = document.getElementById('app').clientHeight;
      const innerHeight = window.innerHeight;
      const proportion = top / (clientHeight - innerHeight);
      // 但如果已把所有数据加载完毕了，则不请求
      if (proportion > 0.6 && (start + count) < total) {
        this.getMoreData({
          count,
          start: start + count,
          title: this.$route.params.title,
        });
        this.requestFlag = false;
      }
    },
  },
};
</script>

<style scoped>
main {
  margin: 1.04rem auto 0 auto;
}

main h1 {
  margin-bottom: 0.52rem;
  margin-left: 0.3rem;
  color: #494949;
  font-size: 0.48rem;
}

.movieItems {
  display: flex;
  flex-flow: row wrap;
}

.movieItemContainer {
  margin-bottom: 0.4rem;
  display: inline-block;
}
</style>
