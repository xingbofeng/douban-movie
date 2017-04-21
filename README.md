# douban-movie
## 简介
使用[豆瓣api](https://developers.douban.com/wiki/?title=movie_v2)做到还原豆瓣电影wap端模板。

- `webpack` + `vue` + `vuex` + `vue-router` + `iView`仿写豆瓣wap端。
- `rem响应式布局` + `Grid` + `Flexbox`的布局方式。
- 使用`vue-lazyload`实现图片懒加载。
- 使用`http-proxy-middleware`实现跨域。
- 提取公共组件。

```
npm install
npm run dev
```

## 路由
- /: 热映、即将上映、精选榜单等
- /moviedetail/:id: 电影详情页
- /tag/:id: 电影分类详情页
- /celebrity/:id: 影人详情页
- /more/:id: 查看更多
- /search: 电影搜索页
