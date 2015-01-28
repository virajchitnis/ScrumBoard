var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Team = require('../models/Team.js');
var Task = require('../models/Task.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Capstone II Scrum Boards' });
});

/* GET boards page which redirects to the main page. */
router.get('/boards', function(req, res, next) {
	res.send("<script type='text/javascript'>window.location.replace('../');</script>");
});

/* GET board page. */
router.get('/boards/:team', function(req, res, next) {
	req.team.populate('scrumTasks', function(err, task) {
		res.render('board', { title: req.team.name + " - ScrumBoard", teamID: req.team._id });
	});
});

/* PARAM (method) for retrieving a team by its id */
router.param('team', function(req, res, next, id) {
	var query = Team.findById(id);

	query.exec(function (err, team){
		if (err) { return next(err); }
		if (!team) { return next(new Error("can't find team")); }

		req.team = team;
		return next();
	});
});

module.exports = router;
