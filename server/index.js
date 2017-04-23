var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();
app.use('/static', express.static('static'));
app.use('/v2', proxy({
  target: 'http://api.douban.com',
  changeOrigin: true,
  headers: {
    Referer: 'http://api.douban.com',
  },
}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.listen(3000);
