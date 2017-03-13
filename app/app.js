var bodyParser = require('body-parser');
var glob = require('glob');
var expressValidator = require('express-validator');
var express = require('express');
var expressSession = require('express-session');

//database
var db = require('./db');

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(expressValidator());

	app.use(express.static(__dirname + '/public'));

	app.use(expressSession({secret:'supersecret', saveUninitialized: false, resave: false}));

	//models 
	var models = glob.sync(__dirname + '/models/*.js');
	models.forEach(function(modelFileName) {
		require(modelFileName);
	});

	var controllers = glob.sync(__dirname + '/controllers/*.js');

	controllers.forEach(function(controllerFileName) {
		var controller = require(controllerFileName);
		controller(app);
	});

}