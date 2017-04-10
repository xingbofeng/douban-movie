import Vue from 'vue';
import Router from 'vue-router';
import Home from '../containers/Home';
import MovieDetail from '../containers/MovieDetail';
import Comment from '../containers/Comment';
import CommentsList from '../containers/CommentsList';
import Celebrity from '../containers/Celebrity';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/movieDetail',
      name: 'MovieDetail',
      component: MovieDetail,
    },
    {
      path: '/commentsList',
      name: 'CommentsList',
      component: CommentsList,
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment,
    },
    {
      path: '/celebrity',
      name: 'Celebrity',
      component: Celebrity,
    },
  ],
});
