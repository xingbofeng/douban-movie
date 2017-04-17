<template>
  <div class="container">
    <h1>Home</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',

  data() {
    return {
      msg: 'Home',
    };
  },

  mounted() {
    this.testApi();
  },
  computed: mapState({
    // testData: state => state.testData,
    // countAlias: 'count',
    testData(state) {
      return state.home.testData;
    },
  }),

  methods: {
    ...mapActions(['testApi']),
  },
};

</script>

<style scoped>
</style>
