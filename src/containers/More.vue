<template>
  <div class="more">
    <div v-if="currentSeeMore.title === $route.params.title">
      <top-header />
      <main>
        <h1>{{ currentSeeMore.title }}</h1>
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
    <loading v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import PageEnd from '../components/Common/PageEnd';
import MovieItem from '../components/Common/MovieItem';
import Loading from '../components/Common/Loading';

export default {
  name: 'More',

  components: {
    TopHeader,
    PageEnd,
    MovieItem,
    Loading,
  },

  computed: mapState({
    currentSeeMore(state) {
      return state.currentSeeMore;
    },
  }),
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
