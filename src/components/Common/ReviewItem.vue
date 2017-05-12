<template>
  <div class="reviewItem">
    <router-link
      :to="`/review/${review.id}`"
    >
      <h3>{{ review.title }}</h3>
      <div class="authorDetail">
        <strong>{{ review.author.name }}</strong>
        <star
          :average="average"
          :length="0.24"
        />
      </div>
      <p>{{ review.summary }}</p>
    </router-link>
  </div>
</template>

<script>
import Star from './Star';

export default {
  name: 'ReviewItem',

  components: {
    Star,
  },

  props: ['review'],

  computed: {
    average() {
      const { value, max } = this.review.rating;
      return (value / max * 10); // eslint-disable-line
    },
  },
};
</script>

<style scoped>
.reviewItem {
  padding: 0.2rem 0.36rem 0.3rem;
}

h3 {
  color: #494949;
  font-weight: 500;
  font-size: 0.34rem;
  line-height: 1.41;
  margin-bottom: 0.12rem;
}

strong {
  color: #494949;
  font-size: 0.24rem;
  margin-right: 0.04rem;
}

.authorDetail {
  display: flex;
  align-items: center;
}

p {
  color: #aaa;
  font-size: 0.24rem;
  line-height: 1.5;
  margin-top: 0.1rem;
}
</style>
