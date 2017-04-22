import * as types from '../mutation-types';

const state = {
  currentSeeMore: {},
};

const getters = {};

const actions = {};

const mutations = {
  [types.CURRENT_SEE_MORE](state, currentSeeMore) {
    state.currentSeeMore = currentSeeMore;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
