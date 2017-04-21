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
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: (to, before, next) => {
        document.title = '电影 - 豆瓣';
        next();
      },
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
      beforeEnter: (to, before, next) => {
        document.title = '电影 - 豆瓣';
        next();
      },
    },
    {
      path: '/tag/:currentTagId',
      name: 'Tag',
      component: Tag,
      beforeEnter: (to, before, next) => {
        document.title = `关于${to.params.currentTagId}的电影 - 豆瓣`;
        next();
      },
    },
    {
      path: '/commentslist',
      name: 'CommentsList',
      component: CommentsList,
    },
    {
      path: '/comment',
      name: 'Comment',
      component: Comment,
    },
    {
      path: '/celebrity/:celebrityId',
      name: 'Celebrity',
      component: Celebrity,
    },
  ],
});
