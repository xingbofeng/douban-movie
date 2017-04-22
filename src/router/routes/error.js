import Error from '../../components/Common/Error';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '*',
  component: Error,
  beforeEnter: (to, before, next) => {
    document.title = '出错啦 Oops… - 豆瓣';
    store.commit(types.LOADING_FLAG, false);
    store.commit(types.NET_STATUS, '这个页面不存在');
    next();
  },
};
