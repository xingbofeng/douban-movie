# douban-movie
暂时使用解除`Google Chrome`跨域，未来将会使用代理服务器进行转发。

`open -a "Google Chrome" --args --disable-web-security  --user-data-dir`

使用vue全家桶的应用。初步设想是移动端，响应式。

[豆瓣api](https://developers.douban.com/wiki/?title=movie_v2)

```
                  _oo0oo_
                 o8888888o
                 88" . "88
                 (| -_- |)
                 0\  =  /0
               ___/`---'\___
             .' \\|     |// '.
            / \\|||  :  |||// \
           / _||||| -:- |||||- \
          |   | \\\  -  /// |   |
          | \_|  ''\---/''  |_/ |
          \  .-\__  '-'  ___/-. /
        ___'. .'  /--.--\  `. .'___
     ."" '<  `.___\_<|>_/___.' >' "".
    | | :  `- \`.;`\ _ /`;.`/ - ` : | |
    \  \ `_.   \_ __\ /__ _/   .-` /  /
=====`-.____`.___ \_____/___.-`___.-'=====
                  `=---='


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          佛祖保佑         永无BUG
```

```
npm install
npm run dev
npm run build
```

## 路由
```
Home/: 热映、即将上映、精选榜单等
MovieDetail/: 电影详情页
CommentsList/: 影评list
Comment/: 影评详情页
Celebrity/: 影人详情页
```