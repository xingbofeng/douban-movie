<template>
  <div class="home">
    <top-header />
    <h2>{{ hotMovie ? hotMovie.title : '' }}</h2>
    <div class="movieItems">
      <movie-item
        v-for="item in (hotMovie ? hotMovie.subjects.slice(0, 8) : {})"
        :key="item.id"
        :detail="item"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TopHeader from '../components/Home/TopHeader';
import MovieItem from '../components/Home/MovieItem';

export default {
  name: 'Home',

  components: {
    TopHeader,
    MovieItem,
  },

  data() {
    return {
    };
  },

  created() {
    // 获取数据
    this.getHomeData();
  },

  computed: mapState({
    commingSoon(state) {
      return state.home.homeData.commingSoon;
    },
    hotMovie(state) {
      return state.home.homeData.hotMovie;
    },
  }),

  methods: {
    ...mapActions(['getHomeData']),
  },
};

</script>

<style scoped>
.movieItems {
  display: flex;
  flex-flow: row nowrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.movieItems::-webkit-scrollbar {
  display: none;
}

h2 {
  color: #111;
}
</style>
