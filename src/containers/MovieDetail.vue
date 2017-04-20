<template>
  <div class="movieDetail">
    <div
      v-if="Object.keys(currentMovie).length !== 0"
    >
      <top-header />
      <main>
        <h1>{{ currentMovie.title }}</h1>
        <star :average="currentMovie.rating.average" />
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

  computed: mapState({
    currentMovie(state) {
      return state.currentMovie;
    },
  }),

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
}
</style>
