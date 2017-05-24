import Photos from '../../containers/Photos';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '/photos/:currentMovieId',
  component: Photos,
  beforeEnter: (to, before, next) => {
    document.title = '剧照 - 电影 - 豆瓣';
    store.commit(types.LOADING_FLAG, false);
    next();
  },
};
