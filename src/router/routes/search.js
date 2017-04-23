import Search from '../../containers/Search';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '/search',
  component: Search,
  beforeEnter: (to, before, next) => {
    document.title = '搜索 - 电影 - 豆瓣';
    store.commit(types.LOADING_FLAG, false);
    next();
  },
};
