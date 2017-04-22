import MovieDetail from '../../containers/MovieDetail';
import store from '../../store';
import * as types from '../../store/mutation-types';
import {
  currentMovie,
} from '../server';

export default {
  path: '/moviedetail/:currentMovieId',
  name: 'MovieDetail',
  component: MovieDetail,
  beforeEnter: (to, before, next) => {
    const currentMovieId = to.params.currentMovieId;
    if (store.state.moviedetail.currentMovie[`${currentMovieId}`]) {
      store.commit(types.LOADING_FLAG, false);
      next();
      return;
    }
    store.commit(types.LOADING_FLAG, true);
    currentMovie(currentMovieId).then((currentMovieDetail) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      const id = currentMovieDetail.id;
      store.commit(types.CURRENT_MOVIE, {
        [`${id}`]: currentMovieDetail,
        ...store.state.moviedetail.currentMovie,
      });
      store.commit(types.LOADING_FLAG, false);
      store.commit(types.NET_STATUS, '');
      document.title = `${currentMovieDetail.title} - 电影 - 豆瓣`;
    }).catch((error) => {
      document.title = '出错啦 Oops… - 豆瓣';
      store.commit(types.NET_STATUS, error);
      store.commit(types.LOADING_FLAG, false);
    });
    next();
  },
};
