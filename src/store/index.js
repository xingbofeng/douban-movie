import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import home from './modules/home';
import tag from './modules/tag';
import moviedetail from './modules/moviedetail';
import more from './modules/more';
import comments from './modules/comments';
import createLogger from '../plugins/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
    netStatus: '',
    loadingFlag: true,
  },
  mutations: mutations.default,
  actions,
  modules: {
    home,
    tag,
    moviedetail,
    more,
    comments,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
