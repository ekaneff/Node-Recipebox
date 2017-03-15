var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

//put models here
var User = mongoose.model('User');
var Recipe = mongoose.model('Recipe');

module.exports = function(app) {
	app.use('/user', router);
}

//user registration
router.get('/register', function(req, res, next) {
	res.render('user/register', {'login': req.session.login});
});

router.post('/register', function(req, res, next) {

	req.checkBody('username', 'You must enter a username').notEmpty();
	req.checkBody('password', 'You must enter a password').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('user/register', {errors: errors});
	} else {

		var user = new User({
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		});

		user.save(function(err, newUser) {
			req.session.name = user.name;
			req.session.login = true;
			req.session.userId = newUser._id;
			res.redirect('/user/profile');
		});
	}

});

//guest access 
router.get('/guest', function( req, res, next) {
	var guestIdInc = 0;
	req.session.guest = true;
	req.session.guestId += guestIdInc;
	res.redirect('/');
});

//user login
router.get('/login', function(req, res, next) {
	if (req.session.guest) {
		res.render('user/login', {'guest': req.session.guest});
	} else {
		res.render('user/login');
	}
	
});

router.post('/login', function(req, res, next) {

	req.checkBody('username', 'You must enter a username').notEmpty();
	req.checkBody('password', 'You must enter a password').notEmpty();

	var errors = req.validationErrors();

	if(errors) {
		res.render('user/login', {errors: errors});
	} else {
		if (req.session.guest) {
			req.session.guest = false;
		}

		User.find({username: req.body.username}, function(err, user) {
			//console.log(user);
			req.session.name = user[0].name;
			req.session.login = true;
			req.session.userId = user[0]._id;
			res.redirect('/user/profile');
		});
	}

});

//user profile
router.get('/profile', function(req, res, next) {
	//console.log(req.session.guest);
	if(req.session.login) {
		Recipe.find({ownerId: req.session.userId}, function(err, recipes) {
			var ratings = [];
			recipes.forEach(function(recipe) {
				var spans ='';
				for (var i = 0; i < recipe.rating; i++) {
					spans += '<span class="glyphicon glyphicon-star">';
				}
				ratings.push(spans);
			});
			res.render('user/profile', {name: req.session.name, login: req.session.login, userId: req.session.userId, recipes: recipes, ratings: ratings});
		});
	} else {
		res.redirect('/');
	}
});

//user logout
router.get('/logout', function(req, res, next) {
	req.session.destroy(function(err) {
		res.redirect('/');
	});
});
