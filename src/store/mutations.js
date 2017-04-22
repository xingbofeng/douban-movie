import * as types from './mutation-types';

const mutations = {
  [types.CURRENT_MOVIE](state, currentMovie) {
    state.currentMovie = currentMovie;
  },

  [types.CURRENT_SEE_MORE](state, currentSeeMore) {
    state.currentSeeMore = currentSeeMore;
  },

  [types.NET_STATUS](state, netStatus) {
    state.netStatus = netStatus;
  },

  [types.LOADING_FLAG](state, loadingFlag) {
    state.loadingFlag = loadingFlag;
  },
};

export default mutations;
