import Reviews from '../../containers/Reviews';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '/reviews/:currentMovieId',
  component: Reviews,
  beforeEnter: (to, before, next) => {
    document.title = '影评 - 电影 - 豆瓣';
    store.commit(types.LOADING_FLAG, false);
    next();
  },
};
