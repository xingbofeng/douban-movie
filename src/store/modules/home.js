import * as types from '../mutation-types';
import { ajax } from '../../util';
// 影院热映
const hotMovie = ajax('/v2/movie/in_theaters');
// 即将上映
const commingSoon = ajax('/v2/movie/coming_soon');

const state = {
  homeData: {},
};

const getters = {};

const actions = {
  getHomeData({ commit }) {
    Promise.all([hotMovie, commingSoon]).then((data) => {
      commit(types.HOME_DATA, {
        hotMovie: data[0],
        commingSoon: data[1],
      });
    });
  },
};

const mutations = {
  [types.HOME_DATA](state, homeData) {
    state.homeData = homeData;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
