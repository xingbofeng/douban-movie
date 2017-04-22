import * as types from '../mutation-types';

const state = {
  currentMovie: {},
};

const getters = {};

const actions = {};

const mutations = {
  [types.CURRENT_MOVIE](state, currentMovie) {
    state.currentMovie = currentMovie;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
