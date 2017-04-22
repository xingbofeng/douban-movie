<template>
  <div class="movieDetail">
    <section>
      <top-header />
      <infos
        :currentMovie="currentMovie"
      />
      <page-end />
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import Infos from '../components/MovieDetail/Infos';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'MovieDetail',

  components: {
    TopHeader,
    Infos,
    PageEnd,
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
</style>
