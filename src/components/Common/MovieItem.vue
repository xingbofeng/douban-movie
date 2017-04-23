<template>
  <router-link :to="`/moviedetail/${(detail.subject ? detail.subject : detail).id}`">
    <section
      class="movieItem"
    >
      <img
        v-lazy="(detail.subject ? detail.subject : detail).images.large"
        alt="电影图片"
      >
      <h3 class="item-title">{{ (detail.subject ? detail.subject : detail).title }}</h3>
      <div class="average">
        <star
          :average="average"
          :length="0.2"
        />
        <span v-if="average">
          {{ average.toFixed(1) }}
        </span>
      </div>
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

  computed: {
    average() {
      return (
        this.detail.subject ?
        this.detail.subject : this.detail
      ).rating.average;
    },
  },

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
  margin-left: 0.375rem;
}

img {
  width: 2rem;
  height: 2.8568rem;
}

.item-title {
  margin-top: 0.3rem;
  margin-bottom: 0.096rem;
  font-size: 0.3rem;
  line-height: 0.3rem;
  color: #111;
  max-width: 2rem;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.average {
  display: flex;
  color: #aaa;
  font-size: 0.24rem;
  font-weight: bold;
}

.average > span {
  margin-left: 0.03rem;
}
</style>
