<template>
  <router-link to="/moviedetail">
    <section class="movieItem">
      <img :src="(detail.subject ? detail.subject : detail).images.large" alt="电影图片">
      <h3 class="item-title">{{ (detail.subject ? detail.subject : detail).title }}</h3>
      <star
        :average="(detail.subject ? detail.subject : detail).rating.average"
      />
    </section>
  </router-link>
</template>

<script>
import Star from './Star';

export default {
  name: 'MovieItem',

  components: {
    Star,
  },

  props: ['detail'],

  data() {
    return {
      msg: 'movieItem',
    };
  },
};
</script>

<style scoped>
.movieItem {
  display: inline-flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  margin-left: 0.36rem;
}

img {
  width: 2rem;
  height: 2.8568rem;
}

.item-title {
  margin-top: 0.3rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  color: #111;
  max-width: 2rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
