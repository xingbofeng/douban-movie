<template>
  <div class="movieDetail">
    <section>
      <top-header />
      <infos
        :currentMovie="currentMovie"
      />
      <div class="photos">
        <h2>
          {{ currentMovie.title }}的预告片和图片({{ currentMovie.photos_count }})
        </h2>
        <ul class="imgs">
          <li
            v-for="item in currentMovie.trailers"
          >
            <a
              :href="`https://m.douban.com/movie/trailer/${item.id}`"
            >
              <img
                src="./../assets/play-button.png"
                alt="播放按钮"
                class="playBtn"
              />
              <img
                :src="item.medium"
                alt="预告片图片"
                class="photo"
              />
            </a>
          </li>
          <li
            v-for="item in currentMovie.photos"
          >
            <a
              :href="item.cover"
            >
              <img
                :src="`${item.cover}`"
                alt="电影图片"
                class="photo"
              />
            </a>
          </li>
        </ul>
        <router-link
          :to="`/photos/${currentMovie.id}`"
          class="go"
        >查看全部图片</router-link>
      </div>
      <div class="comments">
        <h2>{{ `${currentMovie.title}的短评(${currentMovie.comments_count})` }}</h2>
        <comment-item
          v-for="item in currentMovie.popular_comments"
          :comment="item"
          :key="item.id"
        />
        <router-link
          :to="`/comments/${currentMovie.id}`"
          class="go"
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
          class="go"
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

.photos h2 {
  width: 6.9rem;
}

.go {
  display: block;
  text-align: center;
  padding: 0.3rem 0;
  font-size: 0.32rem;
  color: #42bd56;
  font-weight: bold;
}

.imgs {
  height: 2.4rem;
  padding: 0 0.3rem 0.4rem 0.3rem;
  display: flex;
  flex-direction: row;
  width: 7.5rem;
  overflow: auto;
}

.imgs::-webkit-scrollbar {
  display: none;
}

.imgs li {
  position: relative;
}

.photo {
  height: 2.4rem;
  margin-right: 0.1rem;
}

.playBtn {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -0.42rem;
  margin-left: -0.42rem;
  height: 0.84rem;
  width: 0.84rem;
}
</style>
