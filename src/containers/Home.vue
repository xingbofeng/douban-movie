<template>
  <div class="home">
    <top-header />
    <div
      v-for="item in homeData"
      :key="item.title"
    >
      <h2>
        <span class="title">{{ item ? item.title : '' }}</span>
        <span><router-link to="/more" class="more">更多</router-link></span>
      </h2>
      <div class="movieItems">
        <movie-item
          v-for="item in (item ? item.subjects.slice(0, 8) : {})"
          :key="item.id"
          :detail="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import MovieItem from '../components/Common/MovieItem';


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
    homeData(state) {
      return state.home.homeData;
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
  padding: 0.2rem 0.36rem 0.3rem 0.36rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h2 .title {
  color: #111;
  font-size: 0.36rem;
}

h2 .more {
  color: #42bd56;
  font-size: 0.3rem;
}
</style>
