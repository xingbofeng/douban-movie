import Comments from '../../containers/Comments';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '/comments/:currentMovieId',
  component: Comments,
  beforeEnter: (to, before, next) => {
    document.title = '短评 - 电影 - 豆瓣';
    store.commit(types.LOADING_FLAG, false);
    next();
  },
};
