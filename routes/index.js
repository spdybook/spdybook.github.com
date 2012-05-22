/*
 * GET home page.
 */

exports.index = function(req, res){
  // var headers = { 'content-type': 'application/javascript' };
  // res.push('/main.js', headers, function(err, stream) {
  //   if (err) return;

  //   stream.end('alert("hello from push stream!");');
  // });

  res.render('index', { title: 'Express w/ SPDY 3' });
};

exports.cool = function(req, res) {
  res.render('cool', {title: req.param('title'), post: req.param('post')});
};
