import * as types from '../mutation-types';
import {
  hotMovie,
  commingSoon,
  top250,
  usBox,
  weekly,
  newMovies,
} from '../../router/server';

const requests = (title, count, start) => {
  switch (title) {
    case '正在上映的电影-北京': {
      return hotMovie(count, start);
    }
    case '即将上映的电影': {
      return commingSoon(count, start);
    }
    case '豆瓣电影Top250': {
      return top250(count, start);
    }
    case '豆瓣电影北美票房榜': {
      return usBox(count, start);
    }
    case '豆瓣电影新片榜': {
      return newMovies(count, start);
    }
    case '豆瓣电影本周口碑榜': {
      return weekly(count, start);
    }
    default : {
      return new Promise((resolve, reject) => {
        reject('错误: 404');
      });
    }
  }
};

const state = {
  currentSeeMore: {},
};

const getters = {};

const actions = {
  getMoreData({ commit }, { count, start, title }) {
    requests(title, count, start).then((response) => {
      const newObj = Object.assign({}, response, {
        subjects: [
          ...state.currentSeeMore[title].subjects,
          ...response.subjects,
        ],
      });
      commit(types.CURRENT_SEE_MORE, {
        ...state.currentSeeMore,
        [`${title}`]: newObj,
      });
    }).catch((error) => {
      commit(types.NET_STATUS, error);
    });
  },
};

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
