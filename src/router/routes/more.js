import More from '../../containers/More';
import store from '../../store';
import * as types from '../../store/mutation-types';

export default {
  path: '/more/:title',
  name: 'More',
  component: More,
  beforeEnter: (to, before, next) => {
    document.title = `${to.params.title} - 电影 - 豆瓣`;
    // 做循环，遍历homeData的内容，将之存放在cuurrentSeeMore里面
    store.state.home.homeData.forEach((value) => {
      if (value.title === to.params.title) {
        store.commit(types.CURRENT_SEE_MORE, {
          [`${value.title}`]: value.subjects,
          ...store.state.currentSeeMore,
        });
      }
    });
    next();
  },
};
