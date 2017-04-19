import * as types from './mutation-types';

const mutations = {
  [types.CURRENT_MOVIE](state, currentMovie) {
    state.currentMovie = currentMovie;
  },
  [types.NET_ERROR](state, netError) {
    state.netError = netError;
  },
};

export default mutations;
