
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
  app.use(express.static(__dirname + '/public'));
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

app.get('/real', function(req, res){
  res.render('real', {
    title: 'Hello (real) World!'
  });
});


app.get('/push', function(req, res){
  function push(relative_path) {
    if (!res.push) return;
    res.push(relative_path, {}, function(err, stream) {
        fs.createReadStream('public/' + relative_path).pipe(stream);
    });
  }

  push("/images/00-h.jpg");
  push("/images/01-e.jpg");
  push("/images/02-l.jpg");
  push("/images/03-l.jpg");
  push("/images/04-o.jpg");
  push("/images/05-space.jpg");
  push("/images/06-w.jpg");
  push("/images/07-o.jpg");
  push("/images/08-r.jpg");
  push("/images/09-l.jpg");
  push("/images/10-d.jpg");
  push("/images/11-bang.jpg");

  res.render('real', {
    title: 'Hello (real) World!'
  });
});


app.listen(4000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
