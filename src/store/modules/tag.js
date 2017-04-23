import * as types from '../mutation-types';
import { getTagData } from '../../router/server';

const state = {
  tagData: {},
};

const getters = {};

const actions = {
  getMoreTagData({ commit }, { tag, count, start }) {
    getTagData(tag, count, start).then((response) => {
      const newObj = Object.assign({}, response, {
        subjects: [
          ...state.tagData[tag].subjects,
          ...response.subjects,
        ],
      });
      commit(types.CURRENT_TAG, {
        ...state.tagData,
        [`${tag}`]: newObj,
      });
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
