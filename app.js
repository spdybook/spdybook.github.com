
/**
 * Module dependencies.
 */

var express = require('express')
  , spdy = require('spdy')
  , fs = require('fs')
  , routes = require('./routes');

//var app = module.exports = express.createServer();
var options = {
  key: fs.readFileSync(__dirname + '/keys/private_key.pem'),
  cert: fs.readFileSync(__dirname + '/keys/cert.pem'),
  ca: fs.readFileSync(__dirname + '/keys/ca.pem')
};

var app = spdy.createServer(express.HTTPSServer, options);
// var app = spdy.createServer(options, function(req, res) {
//   console.log("xxxxxxxxxx0000000000");
//   var headers = { 'content-type': 'application/javascript' };
//   res.push('/main.js', headers, function(err, stream) {
//     if (err) return;

//     stream.end('alert("hello from push stream!");');
//   });

//   res.end('<script src="/main.js"></script>');
// });

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/_site'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// app.get('/', routes.index);
// app.get('/cool', routes.cool);
// app.post('/cool', routes.cool);

app.listen(4000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
