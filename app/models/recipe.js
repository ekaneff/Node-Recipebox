var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
	ownerId: String,
	smImgSrc: String,
	lgImgSrc: String,
	title: String,
	rating: Number,
	description: String,
	ingredients: [String]
});

module.exports = mongoose.model('Recipe', recipeSchema);