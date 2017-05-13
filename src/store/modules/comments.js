import * as types from '../mutation-types';

const state = {
  currentComments: {},
};

const getters = {};

const actions = {};

const mutations = {
  [types.CURRENT_COMMENTS](state, currentComments) {
    state.currentComments = currentComments;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
