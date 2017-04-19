import * as types from '../mutation-types';
import { ajax } from '../../util';
// 影院热映
const hotMovie = ajax('/v2/movie/in_theaters');
// 即将上映
const commingSoon = ajax('/v2/movie/coming_soon');
// top250
const top250 = ajax('/v2/movie/top250');
// 口碑榜：api失效
// const weekly = ajax('/v2/movie/weekly');
// 北美票房榜
const usBox = ajax('/v2/movie/us_box');
// 新片榜：api失效
// const newMovies = ajax('/v2/movie/new_movies');

const state = {
  homeData: {},
};

const getters = {};

const actions = {
  getHomeData({ commit }) {
    if (Object.keys(state.homeData).length !== 0) {
      return;
    }
    Promise.all([
      hotMovie,
      commingSoon,
      top250,
      usBox,
    ]).then((homeData) => {
      commit(types.HOME_DATA, homeData);
    }).catch((err) => {
      console.log(err);
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
