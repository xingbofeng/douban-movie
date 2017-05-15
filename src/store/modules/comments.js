import * as types from '../mutation-types';
import { comments } from '../../router/server';

const state = {
  currentComments: {},
};

const getters = {};

const actions = {
  getMoreCommentData({ commit }, { id, count, start }) {
    comments(id, count, start).then((response) => {
      const newObj = Object.assign({}, response, {
        comments: [
          ...state.currentComments[id].comments,
          ...response.comments,
        ],
      });
      commit(types.CURRENT_COMMENTS, {
        ...state.currentComments,
        [`${id}`]: newObj,
      });
    }).catch((error) => {
      commit(types.NET_STATUS, error);
    });
  },
};

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
