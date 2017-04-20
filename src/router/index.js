import Vue from 'vue';
import Router from 'vue-router';
import Home from '../containers/Home';
import MovieDetail from '../containers/MovieDetail';
import Comment from '../containers/Comment';
import CommentsList from '../containers/CommentsList';
import Celebrity from '../containers/Celebrity';
import Search from '../containers/Search';
import More from '../containers/More';
import Tag from '../containers/Tag';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/more',
      name: 'More',
      component: More,
    },
    {
      path: '/moviedetail/:currentMovieId',
      name: 'MovieDetail',
      component: MovieDetail,
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag,
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
