var express = require('express');
var router = express.Router();
var Users = require('../models/users'); //Users=model
var Stories = require('../models/stories');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Stories' });
});

router.get('/signup', function(req, res){
	res.render('signup');
});



router.post('/signup', function(req, res){
	 console.log('req.....', req.body);
	var user = new Users({
		username: req.body.username,
		password: req.body.password
	});
	 var promise = user.save(); //db ma add  garna
	promise.then((user) => {
		console.log('user signed up with values', user);
	})
});


module.exports = router;
