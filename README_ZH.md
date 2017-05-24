# douban-movie(豆瓣电影wap版)

[![downloads-image](http://img.shields.io/npm/dm/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![npm-image](http://img.shields.io/npm/v/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![travis-image](http://img.shields.io/travis/xingbofeng/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![appveyor-image](https://ci.appveyor.com/api/projects/status/bsu9w9ar8pboc2nj?svg=true)](https://github.com/xingbofeng/douban-movie)
[![codeship-image](https://codeship.com/projects/79da7240-5481-0132-ea32-42ab35009c21/status)](https://github.com/xingbofeng/douban-movie)
[![david-dm-image](https://david-dm.org/xingbofeng/douban-movie.svg)](https://github.com/xingbofeng/douban-movie)
[![david-dm-dev-image](https://david-dm.org/xingbofeng/douban-movie/dev-status.svg)](https://github.com/xingbofeng/douban-movie)

用vue全家桶仿写豆瓣电影wap版。

最近在公司项目中尝试使用vue，但奈何自己初学水平有限，上了vue没有上vuex，开发过程特别难受。

于是玩一玩本项目，算是对相关技术更加熟悉了。

原计划仿写完所有页面，碍于豆瓣的接口API有限，实现页面也有限。

由于公开的[豆瓣接口](https://developers.douban.com/wiki/?title=movie_v2#subject)具有访问次数限制，克隆到本地体验效果更加！

web端访问已设置宽度适配。

进入GitHub查看[本项目源码](https://github.com/xingbofeng/douban-movie)

欢迎`issue`，`pr`，`star` or `follow`！我将继续开源更多有趣的项目！

推荐一些之前写的新手入门项目
- [wx-audio(微信小程序：音乐播放器)](https://github.com/xingbofeng/wx-audio)
- [paintCanvas(vue实现的你画我猜)](https://github.com/xingbofeng/paintCanvas)
- [css-grid-flex(关于css的grid布局和flex布局的入门心得)](https://github.com/xingbofeng/css-grid-flex)

## 在线版
[点击进入](https://douban.xingbofeng.com)

本地体验线上版本：

```
git clone https://github.com/xingbofeng/douban-movie.git

cd douban-movie

yarn install

yarn run server
```
打开浏览器访问http://localhost:3000/ 体验！

## 使用
```
git clone https://github.com/xingbofeng/douban-movie.git

cd douban-movie

yarn install 

yarn run dev
```
打开浏览器访问http://localhost:8080/ 体验！

## 部分效果截图
![](https://user-gold-cdn.xitu.io/2017/4/23/1e8f797a25d254918d1d0409550e2727.gif)

## 工具&技能
- `vue` + `vuex`+ `vue-router`全家桶
- `webpack` + `webpack-dev-server` + `http-proxy-middleware`进行本地开发环境http请求转发，实现跨域请求
- 线上使用`express`的`http-proxy-middleware`实现请求转发
- `iView`一款vue的组件库
- `vue-lazyload`实现图片懒加载
- `rem` + `flex` + `grid`实现移动端适配
- `postman` 接口测试工具

## 实现功能
### 首页
- [x] 影院热映、即将上映、top250、北美票房榜
- [x] 电影条目可横向滚动
- [x] 预览电影评分

### 搜索页
输入搜索关键词，`回车键`搜索，或者点击搜索按钮。
- [x] 搜索功能
- [x] 热门搜索词条的记录

### 查看更多
- [x] 预览电影评分
- [x] 滚动动态加载
- [x] 数据缓存入vuex

### 电影详情
- [x] 电影评分
- [x] 电影条目
- [x] 演员列表
- [x] 剧情简介
- [x] 数据缓存入vuex

### 搜索结果页
- [x] 翻页功能
- [x] 图片懒加载
- [x] 预览电影条目
- [x] 本地缓存浏览信息

## 目录结构
```
|
|—— build 
|—— config
|—— server 服务端
| |—— index.js 服务端启动入口文件
| |—— static 打包后的资源文件
| |__ index.html 网页入口
|
|——src 资源文件
| |—— assets 组件静态资源库
| |—— components/
| |    |____ Common/ 可复用的组件
| |    |____ ... 其它不可复用的单独组件
| |
| |—— router/
| |    |____ index.js 路由入口
| |    |____ server.js 封装`Ajax`函数
| |    |____ serverConfig.js 服务端接口配置
| |    |____ routes/ 每个页面的路由, 我们在其生命周期钩子函数中改变`vuex`中的状态
| |
| |—— store vuex状态管理
| |—— App.vue douban-movieSPA
| |__ main.js douban-movieSPA入口
|
|__ static 静态资源目录

```

## 开发心得
### 如何缓存数据

这个问题在我之前的的项目总结已经总结过。

加入我们有电影条目A、B、C三个电影条目详情。进入A加载A，进入B加载B。此时也要把A缓存入vuex中。

可以类似于下面的写法。
```json
{
  [`${A.id}`]: A,
  ...store.state
}
```
具体代码可见`/src/router/routes`下列相关文件
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

### 翻页加载

其实这个在之前的React项目中也有做过，设置一个`currentPage`的状态，然后根据这个状态来渲染页面。

具体代码可见`/src/containers/Tag.vue`。
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
### 滚动加载

类似于瀑布流布局的实现方式，当用户滚动到距离页面底部一定范围的时候去请求后端接口。

具体代码可见`src/containers/More.vue`。
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

### 滚动节流

滚动节流主要作用是控制滚动事件的频率，设置一个`flag`。未超过频率则直接在函数中返回。

具体代码可见`src/containers/More.vue`

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

5. 404与加载页面的实现

这里主要是在`vuex`中设定两个状态。根据这两个状态返回不同的页面。

具体代码可见`src/App.vue`

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

### 在路由钩子函数中改变状态

之前在公司做React项目的时候运用了[universal-router](https://github.com/kriasoft/universal-router)，当时我们可以在进入路由的时候dispatch一个action改变状态，并且使用async/await函数实现异步。

贴一段之前的React代码：

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

类似的，在vue中我们也可以这么做！

具体代码可见`/src/router/routes`下的相关代码

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

### Ajax的封装

其实我就是不想用Ajax操作的相关库罢了……

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

### 代理的配置

为了解决浏览器跨域问题，需要在本地服务端配合实现请求转发。

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

实际环境中，服务器端配置
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

### 移动端的适配

我们使用`rem`作单位，本项目中标准为1rem = 100px，适配750px设备。

浏览器执行下列代码，改变根元素的`font-size`，做到移动端的适配。

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

文档借鉴自我的同学[ShanaMaid](https://github.com/ShanaMaid)。
## 支持

BUG提交请发送邮箱: me@xingbofeng.com

欢迎`issue`，`pr`，`star` or `follow`！我将继续开源更多有趣的项目!

你的支持将有助于项目维护以及提高用户体验，感谢各位的支持！