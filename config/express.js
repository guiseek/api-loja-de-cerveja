'use strict';

var express = require('express'),
		morgan = require('morgan'),
		bodyParser = require('body-parser'),
		config = require('./config'),
		path = require('path'),
		cors		= require('cors');

module.exports = function(db) {
	var app = express();

	app.set('showStackError', true);

	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.use(cors());

	config.getGlobbedFiles('./app/components/*/models/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	var api = express.Router();

	config.getGlobbedFiles('./app/components/*/routes/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(api);
	});

  app.use('/api', api);

	app.use(function(err, req, res, next) {
		if (!err) return next();

		console.error(err.stack);

		res.status(500).json({
			error: err.stack
		});
	});

	app.use(function(req, res) {
		res.status(404).json({
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	return app;
};
