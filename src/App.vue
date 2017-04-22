<template>
  <div id="app">
    <h1 v-if="netStatus">{{ netStatus }}</h1>
    <loading v-else-if="!netStatus && loadingFlag" />
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Loading from './components/Common/Loading';

export default {
  name: 'App',

  components: {
    Loading,
  },

  computed: mapState({
    netStatus(state) {
      return state.netStatus;
    },
    loadingFlag(state) {
      return state.loadingFlag;
    },
  }),
};
</script>

<style>
#app {
  max-width: 7.5rem;
  margin: 0 auto;
}
</style>
