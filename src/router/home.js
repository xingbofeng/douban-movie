import Home from '../containers/Home';
import store from '../store';
import * as types from '../store/mutation-types';
import {
  hotMovie,
  commingSoon,
  top250,
  usBox,
} from './server';

export default {
  path: '/',
  name: 'Home',
  component: Home,
  beforeEnter: (to, before, next) => {
    if (Object.keys(store.state.home.homeData).length !== 0) {
      store.commit(types.LOADING_FLAG, false);
      next();
      return;
    }
    document.title = '电影 - 豆瓣';
    store.commit(types.LOADING_FLAG, true);
    Promise.all([
      hotMovie,
      commingSoon,
      top250,
      usBox,
    ]).then((homeData) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      store.commit(types.HOME_DATA, homeData);
      store.commit(types.LOADING_FLAG, false);
      store.commit(types.NET_STATUS, '');
    }).catch((error) => {
      store.commit(types.NET_STATUS, error);
      store.commit(types.LOADING_FLAG, false);
    });
    next();
  },
};
