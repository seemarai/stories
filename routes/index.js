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
	res.redirect('login');
});

router.get('/login', function(req, res){
	res.render('login');
});

router.post('/login', function(req, res){
	//console.log('req.....', req.body);
	
	// 	Users.findOne({username: req.body.username, password: req.body.password}), function(err, user){

	// 	console.log('logged in user is', user);
	// });
	if(req.body.username && req.body.password){
		Users.find({username: req.body.username, password: req.body.password}, 
		function(err, user){
			console.log("user is", user);

		});
	}else{
		console.log("Retry");
	}
	res.redirect('addstories');
});


router.get('/addstories', function(req, res){
	res.render('addstories');
});

router.post('/addstories', function(req, res){
	var story = new Stories({
		title: req.body.title,
		story: req.body.story
	})
	var promise = story.save()
	promise.then((story) =>{
		console.log('saved story is', story);
		Stories.find().exec(function(err, stories){
			res.render('addstories', {stories})
		});
	})
	res.redirect('viewstories');
});



router.get('/viewstories', function(req, res){
	Stories.find().exec(function(err, stories){
			res.render('viewstories', {stories})
		});

});






module.exports = router;
