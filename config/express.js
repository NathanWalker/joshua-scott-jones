/**
 * Module dependencies.
 */

var express = require('express')

module.exports = function (app, config, passport) {

  app.set('showStackError', true)
  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))
  app.use(express.favicon())
  app.use(express.static(__dirname + '/dist'))

  // don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'))
  }

  var allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.send(200);
      }
      else {
        next();
      }
  };
  app.use(allowCrossDomain);

  // enable jsonp
  app.enable("jsonp callback")

  app.configure(function () {

    app.engine('.html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/dist')

    app.use(express.bodyParser())
    app.use(express.methodOverride())

    app.use(app.router)

    app.get('/', function(req, res){
      res.sendfile('dist/index.html')
    })

    app.get(/^(.+)$/, function(req, res) {
      res.sendfile('dist' + req.params[0])
    })



  })
}
