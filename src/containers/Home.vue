<template>
  <div class="container">
    <h1>Home</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',

  data() {
    return {
      msg: 'Home',
    };
  },

  computed: mapState({
    count: state => state.count,
    countAlias: 'count',
    countPlusLocalState(state) {
      return state;
    },
  }),
};

</script>

<style scoped>
</style>
