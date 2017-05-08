<template>
  <div class="movieDetail">
    <section>
      <top-header />
      <infos
        :currentMovie="currentMovie"
      />
      <div class="comments">
        <h2>{{ `${currentMovie.title}的短评(${currentMovie.comments_count})` }}</h2>
        <comment-item
          v-for="item in currentMovie.popular_comments"
          :comment="item"
          :key="item.id"
        />
      </div>
      <page-end />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import Infos from '../components/MovieDetail/Infos';
import CommentItem from '../components/Common/CommentItem';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'MovieDetail',

  components: {
    TopHeader,
    Infos,
    PageEnd,
    CommentItem,
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapState({
      currentMovie(state) {
        return state.moviedetail.currentMovie[`${this.$route.params.currentMovieId}`];
      },
    }),
  },
};
</script>

<style scoped>
.movieDetail {
  padding-top: 1.34rem;
}

.comments h2 {
  font-size: 0.3rem;
  margin: 0.6rem auto 0.3rem;
  color: #aaa;
  width: 7.14rem;
}
</style>
