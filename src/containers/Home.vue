<template>
  <div class="home">
    <!-- 主逻辑：两次循环 -->
    <div
    >
      <top-header />
      <div
        v-for="item in homeData"
        :key="item.title"
      >
        <h2>
          <span class="title">{{ item.title }}</span>
          <span>
            <router-link :to="`/more/${item.title}`" class="more">更多</router-link>
          </span>
        </h2>
        <div class="movieItems">
          <movie-item
            v-for="item in item.subjects.slice(0, 8)"
            :key="item.id"
            :detail="item"
          />
        </div>
      </div>
      <page-end />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TopHeader from '../components/Common/TopHeader';
import MovieItem from '../components/Common/MovieItem';
import PageEnd from '../components/Common/PageEnd';

export default {
  name: 'Home',

  components: {
    TopHeader,
    MovieItem,
    PageEnd,
  },

  computed: mapState({
    homeData(state) {
      return state.home.homeData;
    },
  }),
};

</script>

<style scoped>
.home {
  padding-top: 0.74rem;
}

.movieItems {
  display: flex;
  flex-flow: row nowrap;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 4rem;
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
