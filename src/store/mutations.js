import * as types from './mutation-types';

const mutations = {
  [types.CURRENT_MOVIE](state, currentMovie) {
    state.currentMovie = currentMovie;
  },

  [types.CURRENT_SEE_MORE](state, currentSeeMore) {
    state.currentSeeMore = currentSeeMore;
  },

  [types.NET_ERROR](state, netError) {
    state.netError = netError;
  },
};

export default mutations;
