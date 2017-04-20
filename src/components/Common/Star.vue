<template>
  <div class="star">
    <div v-if="!average">
      暂无评分
    </div>
    <div v-else>
      <img
        v-for="n in 5"
        :src="imgSrc(n)"
        :style="`width: ${length}rem;height: ${length}rem`"
      >
    </div>
  </div>
</template>

<script>
import starActive from './../../assets/starActive.png';
import starGrey from './../../assets/starGrey.png';

export default {
  name: 'Star',

  props: ['average', 'length'],

  methods: {
    imgSrc(n) {
      return (
        (2 * n - 1 > this.average) ? // eslint-disable-line
          starGrey : starActive
      );
    },
  },

  data() {
    return {
      msg: 'star',
    };
  },
};
</script>

<style scoped>
.star {
  display: inline-block;
}

</style>
