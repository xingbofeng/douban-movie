<template>
  <div class="tag">
    <section>
      <top-header />
      <div class="tagInfos">
        <h1>{{ $route.params.currentTagId }}</h1>
        <h2>关于{{ $route.params.currentTagId }}的电影</h2>
        <tag-infos-item
          v-for="item in subjects"
          :key="item.id"
          :infos="item"
        />
      </div>
      <footer class="pages">
        <div class="current">·&nbsp;{{ currentPage }}&nbsp;·</div>
        <div class="changePageBtns">
          <button
            :class="{ noClick: currentPage === 1 }"
            @click.prevent.stop="changePage('reduce')"
          >上页</button>
          <button
            :class="{ noClick: currentPage === Math.ceil(tagData.total / 10) }"
            @click.prevent.stop="changePage('add')"
          >下页</button>
        </div>
      </footer>
      <page-end />
    </section>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import TagInfosItem from '../components/Tag/TagInfosItem';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'Tag',

  components: {
    TopHeader,
    TagInfosItem,
    PageEnd,
  },

  data() {
    return {
      currentPage: 1,
    };
  },

  created() {
    const currentTagId = this.$route.params.currentTagId;
    const currentPage = JSON.parse(window.localStorage.doubanMovieCurrentPage)[currentTagId];
    if (currentPage) {
      this.currentPage = currentPage;
    }
  },

  computed: {
    ...mapState({
      tagData(state) {
        return state.tag.tagData[`${this.$route.params.currentTagId}`];
      },
    }),

    subjects() {
      return this.tagData.subjects.slice(
        (this.currentPage - 1) * 10,
        this.currentPage * 10,
      );
    },
  },

  methods: {
    ...mapActions(['getMoreTagData']),
    changePage(flag) {
      const currentTagId = this.$route.params.currentTagId;
      const { start, count } = this.tagData;
      // 第一页不能往前翻页，最后一页不能往后翻页。
      if ((this.currentPage === 1 && flag === 'reduce') ||
        (this.currentPage === Math.ceil(this.tagData.total / 10) && flag === 'add')
      ) {
        return;
      }
      if (flag === 'add') {
        this.currentPage = this.currentPage + 1;
        // 每次请求十条数据
        this.getMoreTagData({
          tag: currentTagId,
          count: 10,
          start: count + start,
        });
        // 需要使用localStorge保存当前的页码信息，再次进入可以有这个页码信息。
        const doubanMovieCurrentPage = JSON.parse(window.localStorage.doubanMovieCurrentPage);
        window.localStorage.doubanMovieCurrentPage = JSON.stringify({
          ...doubanMovieCurrentPage,
          [`${currentTagId}`]: this.currentPage,
        });
      } else {
        this.currentPage = this.currentPage - 1;
      }
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.tag {
  padding-top: 1.34rem;
}

.tagInfos {
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
}

h1 {
  font-size: 0.48rem;
  color: #000;
  line-height: 0.48rem;
}

h2 {
  font-size: 0.3rem;
  color: #aaa;
  margin: 0.3rem 0 0.4rem 0;
}

.current {
  font-size: 0.32rem;
  color: #494949;
  text-align: center;
}

footer.pages {
  width: 6.9rem;
  margin: 0 auto;
}

.changePageBtns {
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-around;
}

button {
  width: 45%;
  font-size: 0.36rem;
  height: 0.64rem;
  line-height: 0.64rem;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 0.08rem;
  border: 0.02rem solid #ccc;
  outline: none;
  cursor: pointer;
}

.noClick {
  color: #ccc;
}
</style>
