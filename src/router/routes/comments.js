import Comments from '../../containers/Comments';
import store from '../../store';
import * as types from '../../store/mutation-types';
import {
  comments,
} from '../server';

export default {
  path: '/comments/:currentMovieId',
  component: Comments,
  beforeEnter: (to, before, next) => {
    const currentMovieId = to.params.currentMovieId;
    if (store.state.comments.currentComments[`${currentMovieId}`]) {
      store.commit(types.LOADING_FLAG, false);
      next();
      return;
    }
    store.commit(types.LOADING_FLAG, true);
    comments(currentMovieId, 20, 0).then((currentCommentsDetail) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      const id = currentCommentsDetail.subject.id;
      store.commit(types.CURRENT_COMMENTS, {
        [`${id}`]: currentCommentsDetail,
        ...store.state.comments.currentComments,
      });
      store.commit(types.LOADING_FLAG, false);
      store.commit(types.NET_STATUS, '');
      document.title = `全部短评 - 电影:${currentCommentsDetail.subject.title} - 豆瓣`;
    }).catch((error) => {
      document.title = '出错啦 Oops… - 豆瓣';
      store.commit(types.NET_STATUS, error);
      store.commit(types.LOADING_FLAG, false);
    });
    next();
  },
};
