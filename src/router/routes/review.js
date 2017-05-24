import Review from '../../containers/Review';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '/review/:currentReviewId',
  component: Review,
  beforeEnter: (to, before, next) => {
    document.title = '影评 - 电影 - 豆瓣';
    store.commit(types.LOADING_FLAG, false);
    next();
  },
};
