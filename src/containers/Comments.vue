<template>
  <div class="comments">
    <section>
      <top-header />
      <div class="subjectInfo">
        <router-link
          :to="`/moviedetail/${$route.params.currentMovieId}`"
          class="movieSubject"
        >
          <img
            :src="currentComments.subject.images.small"
            alt="电影图片"
          />
          <span class="title">{{ currentComments.subject.title }}</span>
          <span class="rating">{{ currentComments.subject.rating.average }}分</span>
        </router-link>
        <div>
          <h1>全部影评（{{ currentComments.total }}）</h1>
          <div class="filter">
            <span
              :class="{ active: currentCommentsTag }"
              @click="changeCommentsTag(true)"
            >热门短评</span>
            <span> / </span>
            <span
              :class="{ active: !currentCommentsTag }"
              @click="changeCommentsTag(false)"
            >最新短评</span>
          </div>
        </div>
      </div>
      <div class="commentInfos">
        <comment-item
          v-for="item in comments"
          :key="item.id"
          :comment="item"
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
            :class="{ noClick: currentPage === Math.ceil(currentComments.total / 10) }"
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
import CommentItem from '../components/Common/CommentItem';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'Comments',

  components: {
    TopHeader,
    CommentItem,
    PageEnd,
  },

  data() {
    return {
      currentPage: 1,
      currentCommentsTag: true, // 热门短评 / 最新短评
    };
  },

  created() {
    const currentCommentsId = this.currentComments.subject.id;
    const currentComments =
      JSON.parse(window.localStorage.doubanMovieCurrentComments)[currentCommentsId];
    if (currentComments) {
      this.currentPage = currentComments;
    }
  },

  computed: {
    ...mapState({
      currentComments(state) {
        return state.comments.currentComments[`${this.$route.params.currentMovieId}`];
      },
    }),

    comments() {
      if (this.currentCommentsTag) {
        return this.currentComments.comments.slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10,
        );
      }
      // 否则按照时间排序：注意这里不能直接用state的数据排序，因为这样会变掉state的数据：会报错
      // 解决方案为深复制
      const comments = JSON.parse(JSON.stringify(this.currentComments.comments));
      return comments.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(
          (this.currentPage - 1) * 10,
          this.currentPage * 10,
        );
    },
  },

  methods: {
    ...mapActions(['getMoreCommentData']),

    changePage(flag) {
      const currentCommentsId = this.currentComments.subject.id;
      const { start, count } = this.currentComments;
      // 第一页不能往前翻页，最后一页不能往后翻页。
      if ((this.currentPage === 1 && flag === 'reduce') ||
        (this.currentPage === Math.ceil(this.currentComments.total / 10) && flag === 'add')
      ) {
        return;
      }
      if (flag === 'add') {
        this.currentPage = this.currentPage + 1;
        // 每次请求十条数据
        this.getMoreCommentData({
          id: currentCommentsId,
          count: 10,
          start: count + start,
        });
        // 需要使用localStorge保存当前的页码信息，再次进入可以有这个页码信息。
        const doubanMovieCurrentComments =
          JSON.parse(window.localStorage.doubanMovieCurrentComments);
        window.localStorage.doubanMovieCurrentComments = JSON.stringify({
          ...doubanMovieCurrentComments,
          [`${currentCommentsId}`]: this.currentPage,
        });
      } else {
        this.currentPage = this.currentPage - 1;
      }
      window.scrollTo(0, 0);
    },

    changeCommentsTag(flag) {
      // 改变样式
      this.currentCommentsTag = flag;
    },
  },
};
</script>

<style scoped>
.comments {
  padding-top: 0.72rem;
}

.commentInfos {
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
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

.movieSubject {
  display: flex;
  border-bottom: 0.02rem solid #f3f3f3;
  height: 0.96rem;
  align-items: center;
  padding: 0 0.15rem;
}

.movieSubject img {
  width: 0.32rem;
  height: 0.48rem;
  margin-right: 0.12rem;
}

.title {
  color: #42bd56;
  font-size: 0.32rem;
  font-weight: bold;
}

.rating {
  font-size: 0.32rem;
  color: #b4b4b4;
  margin-left: 0.04rem;
}

.subjectInfo > div {
  padding: 0 0.15rem;
}

.subjectInfo > div > h1 {
  margin: 0.6rem 0 0.7rem;
  color: #111;
  font-weight: bold;
}

.filter > span {
  font-size: 0.32rem;
  color: #111;
}

.active {
  color: #42bd56 !important;
}
</style>
