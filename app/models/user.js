var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: [true, 'Password required!']
	}
});

module.exports = mongoose.model('User', userSchema);