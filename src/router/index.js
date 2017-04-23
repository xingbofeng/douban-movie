import Vue from 'vue';
import Router from 'vue-router';
import home from './routes/home';
import movieDetail from './routes/movieDetail';
import more from './routes/more';
import tag from './routes/tag';
import error from './routes/error';
import search from './routes/search';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    home,
    movieDetail,
    more,
    tag,
    search,
    error, // 404页面一定要在最后面
  ],
});
