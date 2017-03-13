var mongoose = require('mongoose');

var savedSchema = mongoose.Schema({
	recipeId: String,
	ownerId: String,
	guestId: String,
	smImgSrc: String,
	lgImgSrc: String,
	title: String,
	rating: Number,
	description: String,
	ingredients: [String]
});

module.exports = mongoose.model('Saves', savedSchema);