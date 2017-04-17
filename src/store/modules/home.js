import * as types from '../mutation-types';

const state = {
  testData: {},
};

// getters
const getters = {};

// actions
const actions = {
  testApi({ commit }) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.douban.com/v2/movie/subject/1764796');
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        commit(types.TEST_API, JSON.parse(xhr.responseText));
      }
    };
    // fetch('http://api.douban.com/v2/movie/subject/1764796')
    //   .then(res => res.json())
    //   .then((json) => {
    //     console.log(json);
    //     commit(types.TEST_API, json);
    //   });
  },
};

// mutations
const mutations = {
  [types.TEST_API](state, testData) { // eslint-disable-line
    state.testData = testData; // eslint-disable-line
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
