<template>
  <div class="comments">
    comments
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Comments',

  computed: {
    ...mapState({
      currentComments(state) {
        return state.comments.currentComments[`${this.$route.params.currentMovieId}`];
      },
    }),
  },
};
</script>

<style scoped>
</style>
