import Tag from '../../containers/Tag';
import store from '../../store';
import * as types from '../../store/mutation-types';
import {
  getTagData,
} from '../server';

export default {
  path: '/tag/:currentTagId',
  name: 'Tag',
  component: Tag,
  beforeEnter: (to, before, next) => {
    const currentTagId = to.params.currentTagId;
    document.title = `关于${currentTagId}的电影 - 豆瓣`;
    if (store.state.tag.tagData[`${currentTagId}`]) {
      store.commit(types.LOADING_FLAG, false);
      next();
      return;
    }
    store.commit(types.LOADING_FLAG, true);
    getTagData(currentTagId, 20, 0).then((tagData) => {
      // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
      store.commit(types.CURRENT_TAG, {
        [`${currentTagId}`]: tagData,
        ...store.state.tag.tagData,
      });
      store.commit(types.LOADING_FLAG, false);
      store.commit(types.NET_STATUS, '');
    }).catch((error) => {
      store.commit(types.NET_STATUS, error);
      store.commit(types.LOADING_FLAG, false);
    });
    next();
  },
};
