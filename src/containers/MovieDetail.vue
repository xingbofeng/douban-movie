<template>
  <div class="movieDetail">
    <section
      v-if="currentMovie.id === $route.params.currentMovieId"
    >
      <top-header />
      <infos
        :currentMovie="currentMovie"
      />
      <page-end />
    </section>
    <loading v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Loading from '../components/Common/Loading';
import TopHeader from '../components/Common/TopHeader';
import Infos from '../components/MovieDetail/Infos';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'MovieDetail',

  components: {
    Loading,
    TopHeader,
    Infos,
    PageEnd,
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
</style>
