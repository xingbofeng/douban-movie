import Vue from 'vue';
import Router from 'vue-router';
import Celebrity from '../containers/Celebrity';
import Search from '../containers/Search';
import home from './routes/home';
import movieDetail from './routes/movieDetail';
import more from './routes/more';
import tag from './routes/tag';
import error from './routes/error';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    home,
    movieDetail,
    more,
    tag,
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/celebrity/:celebrityId',
      name: 'Celebrity',
      component: Celebrity,
    },
    error, // 404页面一定要在最后面
  ],
});
