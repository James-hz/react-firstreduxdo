var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var express = require('express');
var compression = require('compression');
var filter = require('./serv/filter');

var path = require('path');

var proxy = require('express-http-proxy');

var app = new (require('express'))();
var port = 3000;

app.enable('trust proxy');

function shouldCompress(req, res) {

  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

//app.use("/client",filter.filterFun)

app.set('view engine', 'hbs');  // 用hbs作为模版引擎
app.set('views', __dirname + '/views'); // 模版所在路径

app.get('/', function (req, res) {
  res.redirect('/client');
});

app.use('/client', function (req, res) {
  console.log('app client');
  res.sendFile(__dirname + '/index.html');
});

app.use('/wxredirect/:channel', function (req, res) {
  console.log(req.params.channel);
  res.render('wxredirect', { channel: req.params.channel, query: req.query });
});

app.use('/debug/wxredirect/:channel', function (req, res) {
  console.log(req.params.channel);
  res.render('debugwxredirect', { channel: req.params.channel, query: req.query });
});

// handle static files
app.use(express.static(path.join(__dirname, '__build')));

app.post('/componentJson', function (req, res) {
  res.sendFile(path.join(__dirname, 'src', 'complist.json'));
});


/**
 * 这里定义接口域名
 */
app.use('/remote', proxy('http://api.dobooking.cn', {
  forwardPath: function (req, res) {
    console.log(require('url').parse(req.url).path);
    return require('url').parse(req.url).path;
  },
}));

app.use('/payModule', proxy('http://pay.dobooking.cn', {
  forwardPath: function (req, res) {
    console.log(require('url').parse(req.url).path);
    return require('url').parse(req.url).path;
  },
}));

app.use('/docker', proxy('http://wx-zs.dobooking.cn', {
  forwardPath: function (req, res) {
    console.log(require('url').parse(req.url).path);
    return require('url').parse(req.url).path;
  },
}));

app.use('/wxupload', proxy('http://api.dobooking.cn', {
  forwardPath: function (req, res) {
    console.log(require('url').parse(req.url).path);
    return require('url').parse(req.url).path;
  },
}));

app.use('/kuaidi', proxy('https://sp0.baidu.com/', {
  forwardPath: function (req, res) {
    console.log(require('url').parse(req.url).path);
    return require('url').parse(req.url).path;
  },
}));

app.use('/view/:channel/:agentid', function (req, res) {
  console.log(req.params.channel);
  res.render('showbarcode', { agentid: req.params.agentid, channel: req.params.channel, query: req.query });
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
