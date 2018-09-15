const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
app.use('/', express.static(`${__dirname}/../dist`));
app.use('/v2', proxy({
  target: 'http://api.douban.com',
  changeOrigin: true,
  headers: {
    Referer: 'http://api.douban.com',
  },
}));

app.listen(3000);
