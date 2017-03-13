var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');

//put models here
var User = mongoose.model('User');
var Recipe = mongoose.model('Recipe');
var Saves = mongoose.model('Saves');

module.exports = function(app) {
	app.use('/save', router);
}

//add recipe to saved
router.get('/recipe/:id', function(req, res, next) {
	if (!req.session.guest == true) {
		res.render('user/login');
	} else {
		Recipe.find({_id: req.params.id}, function(err, recipeA) {
			Saves.find({recipeId: recipeA[0]._id}, function(err, recipeB) {
				if (recipeB.length > 0) {
					res.redirect('/');
				} else {
					var savedRecipe = new Saves({
						recipeId: recipeA[0]._id,
						ownerId: recipeA[0].ownerId,
						guestId: req.session.guestId,
						smImgSrc: recipeA[0].smImgSrc,
						lgImgSrc: recipeA[0].lgImgSrc,
						title: recipeA[0].title,
						rating: recipeA[0].rating,
						description: recipeA[0].description,
						ingredients: recipeA[0].ingredients
					});

					savedRecipe.save(function(err) {
						//handle errors here
						res.redirect('/');
					});
				}
			});
		});
	}
});


//view saved page

router.get('/view', function(req, res, next) {
	if(req.session.login || req.session.guest) {
		Saves.find(function(err, recipes) {
			var ratings = [];
				recipes.forEach(function(recipe) {
					var spans ='';
					for (var i = 0; i < recipe.rating; i++) {
							spans += '<span class="glyphicon glyphicon-star">';
						}
						ratings.push(spans);
					});
			//res.render('index', {'login': req.session.login, name: req.session.name, recipes: recipes, ratings: ratings});
			res.render('saved/saved', {recipes: recipes, ratings: ratings, login: req.session.login, guest: req.session.guest, name: req.session.name});
		});
	} else {
		res.redirect('/user/login');
	}
});

//remove from saved 

router.get('/remove/:id', function(req, res, next) {
	if(req.session.login || req.session.guest) {
		Saves.remove({_id: req.params.id}, function(err) {
			if (err) {
				console.log(err);
			}
		});
		res.redirect('/save/view');
	} else {
		res.redirect('/');
	}
});





