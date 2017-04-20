<template>
  <div class="movieDetail">
    <div
      v-if="currentMovie.id === $route.params.currentMovieId"
    >
      <top-header />
      <main>
        <h1>{{ currentMovie.title }}</h1>
        <div class="movieInfos">
          <div class="left">
            <div class="rating">
              <star
                :average="currentMovie.rating.average"
                :length="0.26"
              />
              <span style="color: #494949;">
                {{
                  currentMovie.rating.average ?
                    currentMovie.rating.average.toFixed(1) : '暂无评分'
                }}
              </span>
              <span style="color: #aaa;">{{ currentMovie.ratings_count }}人评价</span>
            </div>
            <div class="infos">{{ infos }}</div>
          </div>
          <aside>
            <img :src="currentMovie.images.large" class="movieImage">
          </aside>
        </div>
        <div class="summary">
          <h2>{{ currentMovie.title }}的剧情简介</h2>
          <article>
            {{ currentMovie.summary }}
          </article>
        </div>
        <div class="more">
          <h2>查看更多豆瓣高分电影电视剧</h2>
          <article>
            <router-link
              :to="`/tag`"
              v-for="item in currentMovie.genres"
              class="tagItem"
              :key="item"
            >
              {{ item }}
            </router-link>
          </article>
        </div>
      </main>
    </div>
    <loading v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loading from '../components/Common/Loading';
import TopHeader from '../components/Common/TopHeader';
import Star from '../components/Common/Star';

export default {
  name: 'MovieDetail',

  components: {
    Loading,
    TopHeader,
    Star,
  },

  data() {
    return {
    };
  },

  created() {
    if (this.currentMovie.id !== this.$route.params.currentMovieId) {
      this.changeCurrentMovie(this.$route.params.currentMovieId);
    }
  },

  computed: {
    ...mapState({
      currentMovie(state) {
        return state.currentMovie;
      },
    }),

    infos() {
      const { directors, countries, year, genres, casts } = this.currentMovie;
      const array = [];
      Array.prototype.push
        .call(array,
          genres.reduce((previous, current) => `${previous} / ${current}`),
          directors.map(value => `${value.name}(导演)`).join(' / '),
          casts.map(value => value.name).join(' / '),
          `${year}年(${countries.reduce((previous, current) => `${previous} / ${current}`)})上映`,
        );
      return array.join(' / ');
    },
  },

  methods: {
    ...mapActions(['changeCurrentMovie']),
  },
};
</script>

<style scoped>
.movieDetail {
  padding-top: 1.34rem;
}

main {
  width: 6.78rem;
  margin: 0 auto;
}

h1 {
  font-size: 0.48rem;
  color: #111;
  display: inline-block;
  margin-bottom: 0.1rem;
  line-height: 0.48rem;
}

.rating {
  display: flex;
  align-items: center;
}

.rating span {
  font-size: 0.3rem;
  font-weight: bold;
  margin-left: 0.16rem;
}

.movieInfos {
  display: grid;
  grid-template-columns: 239fr 100fr;
}

.infos {
  color: #494949;
  font-size: 0.28rem;
  margin-top: 0.3rem;
}

.left {
  padding-right: 0.48rem;
}

.movieImage {
  width: 2rem;
}

.summary {
  margin-bottom: 0.6rem;
}

h2 {
  color: #aaa;
  margin-bottom: 0.3rem;
  font-size: 0.3rem;
}

article {
  font-size: 0.3rem;
  color: #494949;
}

.tagItem {
  display: inline-block;
  margin: 0.2rem 0.2rem 0 0;
  background-color: #f5f5f5;
  color: #494949;
  font-size: 0.3rem;
  line-height: 0.56rem;
  height: 0.56rem;
  border-radius: 0.28rem;
  text-align: center;
  font-weight: bold;
  padding: 0 0.24rem 0 0.24rem;
}
</style>
