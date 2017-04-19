import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import home from './modules/home';
import createLogger from '../plugins/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  mutations: mutations.default,
  actions,
  modules: {
    home,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
