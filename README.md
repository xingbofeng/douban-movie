# douban-movie

[![downloads-image](http://img.shields.io/npm/dm/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![npm-image](http://img.shields.io/npm/v/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![travis-image](http://img.shields.io/travis/xingbofeng/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![appveyor-image](https://ci.appveyor.com/api/projects/status/bsu9w9ar8pboc2nj?svg=true)](https://github.com/xingbofeng/douban-movie)
[![codeship-image](https://codeship.com/projects/79da7240-5481-0132-ea32-42ab35009c21/status)](https://github.com/xingbofeng/douban-movie)
[![david-dm-image](https://david-dm.org/xingbofeng/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![david-dm-dev-image](https://david-dm.org/xingbofeng/douban-movie/dev-status.svg)](https://github.com/xingbofeng/douban-movie)

It is the douban-movie Application built with webpack + vue + vuex + vue-router + iView.

[中文文档](./README_ZH.md)

because the limit of [open API](https://developers.douban.com/wiki/?title=movie_v2#subject) is 40 times / minute.I recommended you clone this project to you own local environment.

Enter GitHub to see [code](https://github.com/xingbofeng/douban-movie)!

Thanks for you support, waiting for your `issue`, `pr`, `star` or `follow`!I will release more interesting project in the future!

## Online
[Click Here](https://douban.xingbofeng.com/)

Or you can clone this project to you own local environment, then enjoy this project online：

```
git clone https://github.com/xingbofeng/douban-movie.git

cd douban-movie

yarn install

yarn run server
```
Then open your browser, and go to http://localhost:3000/ to enjoy it!

## Development
```
git clone https://github.com/xingbofeng/douban-movie.git

cd douban-movie

yarn install 

yarn run dev
```
Then open your browser, and go to http://localhost:8080/ to enjoy it!

## Preview
![](https://user-gold-cdn.xitu.io/2017/4/23/1e8f797a25d254918d1d0409550e2727.gif)

## Technology stack
- `vue` + `vuex`+ `vue-router` vue based project
- `webpack` + `webpack-dev-server` + `http-proxy-middleware` dev environment we use webpack-dev-server and http-proxy-middleware.
- `express` + `http-proxy-middleware` online we use express and http-proxy-middleware
- `iView` UI components library
- `vue-lazyload` help us lazyload images
- `rem` + `flex` + `grid` responsive layout in mobile
- `yarn` package manager.
- `postman` test our interface

## Functions
### src/containers/Home.vue
- [x] hot-movie, comming-soon, top250 and us-box.
- [x] horizontal scrolling.
- [x] preview the score of the movie.

### src/containers/Search.vue
You should input some word which is you want to search, then press `Enter` and begin to search, or you can click the button of search.
- [x] search.
- [x] save the hot search record.

### src/containers/More.vue
- [x] preview the score of the movie.
- [x] loading when you scroll.
- [x] save the data you accessd to `vuex`.

### src/containers/MovieDetail.vue
- [x] score of the movie.
- [x] information of the movie.
- [x] actors list.
- [x] the plot.
- [x] save the data you accessd to `vuex`.

### src/containers/Tah.vue
- [x] turn the page.
- [x] lazyload images.
- [x] preview the information of the movie.
- [x] cache your browsing.

## Directory
```
|
|—— build 
|—— config
|—— server
| |—— index.js : the entry of the server.
| |—— static/ : static files after packaging.
| |__ index.html : the entry of this application.
|
|——src : dev resources.
| |—— assets : images
| |—— components/
| |    |____ Common/ : reusable components
| |    |____ ... : other components of the own page.
| |
| |—— router/
| |    |____ index.js : the entry of router.
| |    |____ server.js : export ajax function.
| |    |____ serverConfig.js : export the server detail.
| |    |____ routes/ : every page's router, changing the state of `vuex` at its lifecycle function.
| |
| |—— store : vuex
| |—— App.vue : douban-movieSPA
| |__ main.js : the entry of douban-movieSPA
|
|__ static : static files

```

## What did I learnt in this project?
### How to save data in vuex?

```json
{
  [`${A.id}`]: A,
  ...store.state
}
```
see the codes of `/src/router/routes`.
```javascript
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
}
```

### How to turn the page and load?

We set a state named `currentPage`，everytime we change this state, the page will rerender.

see the codes of `/src/containers/Tag.vue`.
```javascript
computed: {
  ...mapState({
    tagData(state) {
      return state.tag.tagData[`${this.$route.params.currentTagId}`];
    },
  }),

  subjects() {
    return this.tagData.subjects.slice(
      (this.currentPage - 1) * 10,
      this.currentPage * 10,
    );
  },
},

methods: {
  ...mapActions(['getMoreTagData']),
  changePage(flag) {
    const currentTagId = this.$route.params.currentTagId;
    const { start, count } = this.tagData;
    // 第一页不能往前翻页，最后一页不能往后翻页。
    if ((this.currentPage === 1 && flag === 'reduce') ||
      (this.currentPage === Math.ceil(this.tagData.total / 10) && flag === 'add')
    ) {
      return;
    }
    if (flag === 'add') {
      this.currentPage = this.currentPage + 1;
      // 每次请求十条数据
      this.getMoreTagData({
        tag: currentTagId,
        count: 10,
        start: count + start,
      });
      // 需要使用localStorge保存当前的页码信息，再次进入可以有这个页码信息。
      const doubanMovieCurrentPage = JSON.parse(window.localStorage.doubanMovieCurrentPage);
      window.localStorage.doubanMovieCurrentPage = JSON.stringify({
        ...doubanMovieCurrentPage,
        [`${currentTagId}`]: this.currentPage,
      });
    } else {
      this.currentPage = this.currentPage - 1;
    }
    window.scrollTo(0, 0);
  },
```
### How to scroll and load?

like the waterfall layout,when user scroll to some location , we request the data form back-end.

see the codes of `src/containers/More.vue`。
```javascript
handleScroll() {
  // 函数的作用是滚动加载电影详情信息
  // 判断是否为请求后台中的状态，如果是则返回
  const { start, count, total } = this.currentSeeMore;
  if (!this.requestFlag) {
    return;
  }
  // 不同浏览器top展现会不一致
  let top = window.document.documentElement.scrollTop;
  if (top === 0) {
    top = document.body.scrollTop;
  }
  const clientHeight = document.getElementById('app').clientHeight;
  const innerHeight = window.innerHeight;
  const proportion = top / (clientHeight - innerHeight);
  // 但如果已把所有数据加载完毕了，则不请求
  if (proportion > 0.6 && (start + count) < total) {
    this.getMoreData({
      count,
      start: start + count,
      title: this.$route.params.title,
    });
    this.requestFlag = false;
  }
}
```

### How to throttle when user scroll?

To implementation throttle of scrolling, we set a `flag`.when `flag === true`, we return the scroll function.

see the codes of `src/containers/More.vue`.

```javascript
scrolling() {
  // scrolling函数用于作函数节流
  if (this.scrollFlag) {
    return;
  }
  this.scrollFlag = true;
  setTimeout(() => {
    this.handleScroll();
    this.scrollFlag = false;
  }, 20);
}
```

### 404 and loading

set two states in `vuex`.

see the codes of `src/App.vue`

```html
<template>
  <div id="app">
    <net-error
      v-if="netStatus"
      :netStatus="netStatus"
    />
    <loading
      v-else-if="!netStatus && loadingFlag"
    />
    <router-view v-else></router-view>
  </div>
</template>
```

### How to change the asynchronous state?

We often use [universal-router](https://github.com/kriasoft/universal-router) in `React`project.in that case, we can `dispatch` an `action` to change the state of `redux`, when we entry/change the router, and we use async/await fuction.

Like this code of React:

```javascript
async action({ store, params }) {
  // 判断store里的id和当前id是否一致，若一致，则不请求后台
  console.log("chapter")
  const chapterInfos = store.getState().home.chapterInfos;
  if (Object.keys(chapterInfos).length === 0 ||
    chapterInfos.subject.id !== parseInt(params.chapter, 10)) {
    await store.dispatch(chapter(params.chapter));
  }
}
```

And in this project, I had imitated it!

see the codes of `/src/router/routes`

```javascript
beforeEnter: (to, before, next) => {
  document.title = '电影 - 豆瓣';
  if (Object.keys(store.state.home.homeData).length !== 0) {
    store.commit(types.LOADING_FLAG, false);
    next();
    return;
  }
  store.commit(types.LOADING_FLAG, true);
  Promise.all([
    hotMovie(8, 0),
    commingSoon(8, 0),
    top250(8, 0),
    usBox(8, 0),
  ]).then((homeData) => {
    // 成功则commit后台接口的数据，并把NET_ERROR的数据置空，并把加载中的状态置为false。
    store.commit(types.HOME_DATA, homeData);
    store.commit(types.LOADING_FLAG, false);
    store.commit(types.NET_STATUS, '');
  }).catch((error) => {
    document.title = '出错啦 Oops… - 豆瓣';
    store.commit(types.NET_STATUS, error);
    store.commit(types.LOADING_FLAG, false);
  });
  next();
}
```

### Ajax

```javascript
import serverConfig from './serverConfig';

const Ajax = url => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(`错误: ${xhr.status}`);
      }
    }
  };
});

// 影院热映
export const hotMovie = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/in_theaters?count=${count}&start=${start}`);
// 即将上映
export const commingSoon = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/coming_soon?count=${count}&start=${start}`);
// top250
export const top250 = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/top250?count=${count}&start=${start}`);
// 北美票房榜
export const usBox = (count, start) =>
  Ajax(`${serverConfig}/v2/movie/us_box?count=${count}&start=${start}`);
// 当前电影详情信息
export const currentMovie = currentMovieId =>
  Ajax(`${serverConfig}/v2/movie/subject/${currentMovieId}`);
// 当前标签详情信息
export const getTagData = (tag, count, start) =>
  Ajax(`${serverConfig}/v2/movie/search?tag=${tag}&count=${count}&start=${start}`);
```

### How to set proxy?
In dev environment we use `webpack-dev-server` and `http-proxy-middleware`, and online we use `express` and `http-proxy-middleware`.

```
proxyTable: {
  '/v2': {
    target: 'http://api.douban.com',
    changeOrigin: true,
    pathRewrite: {
      '^/v2': '/v2'
    }
  }
},
```

```
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use('/static', express.static('static'));
app.use('/v2', proxy({
  target: 'http://api.douban.com', 
  changeOrigin: true, 
  headers: {
    Referer: 'http://api.douban.com'
  }
}
));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000);
```

### Responsive layout in mobile

Use `rem`! In this project `1rem = 100px`!

The browser run the codes following，change the `font-size` of the document.

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
```

```javascript
(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth > 750 ? 360 : docEl.clientWidth ;
      if (!clientWidth) return;
      docEl.style.fontSize = clientWidth / 750 * 100 + 'px';
    };
  if (!doc.addEventListener) return;
  doc.addEventListener('DOMContentLoaded', recalc, false);
  if (docEl.clientWidth > 750) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);
```

Chinese document referencing my friend [ShanaMaid](https://github.com/ShanaMaid)!
## Support

Thanks for you support,being glad for your `star`, `pr`, `follow` and `issue`.

When you see bugs.You can mail to me! me@xingbofeng.com !
