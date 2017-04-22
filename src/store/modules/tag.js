import * as types from '../mutation-types';
import { ajax } from '../../util';

const state = {
  tagData: {},
};

const getters = {};

const actions = {
  getTagData({ commit }, tag) {
    // 搜索标签栏目信息
    ajax(`/v2/movie/search?tag=${tag}`)
      .then((tagData) => {
        commit(types.CURRENT_TAG, tagData);
      }).catch((error) => {
        commit(types.NET_STATUS, error);
      });
  },
};

const mutations = {
  [types.CURRENT_TAG](state, tagData) {
    state.tagData = tagData;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
