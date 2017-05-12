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
        <router-link
          :to="`/comments/${currentMovie.id}`"
          class="goCommentsOrReviews"
        >查看全部短评</router-link>
      </div>
      <div class="reviews">
        <h2>{{ `${currentMovie.title}的影评(${currentMovie.reviews_count})` }}</h2>
        <review-item
          v-for="item in currentMovie.popular_reviews"
          :review="item"
          :key="item.id"
        />
        <router-link
          :to="`/reviews/${currentMovie.id}`"
          class="goCommentsOrReviews"
        >查看全部影评</router-link>
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
import ReviewItem from '../components/Common/ReviewItem';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'MovieDetail',

  components: {
    TopHeader,
    Infos,
    PageEnd,
    CommentItem,
    ReviewItem,
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

h2 {
  font-size: 0.3rem;
  margin: 0.6rem auto 0.3rem;
  color: #aaa;
  width: 7.14rem;
}

.goCommentsOrReviews {
  display: block;
  text-align: center;
  padding: 0.3rem 0;
  font-size: 0.32rem;
  color: #42bd56;
  font-weight: bold;
}
</style>
