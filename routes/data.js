var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Team = require('../models/Team.js');
var Task = require('../models/Task.js');

/* GET all teams. */
router.get('/', function(req, res, next) {
	Team.find(function (err, data) {
		if (err) return next(err);
		res.json(data);
	});
});

/* POST (add) a new team */
router.post('/teams', function(req, res, next) {
	var team = new Team(req.body);

	team.save(function(err, team){
		if(err){ return next(err); }

		var socketio = req.app.get('socketio'); // tack out socket instance from the app container
		socketio.sockets.emit('team.created', team); // emit an event for all connected clients

		res.json(team);
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

/* GET a particular team by its id */
router.get('/teams/:team', function(req, res) {
	req.team.populate('scrumTasks', function(err, task) {
		res.json(req.team);
	});
});

/* PUT (update) a particular team by its id */
router.put('/teams/:team', function(req, res, next) {
	Team.findByIdAndUpdate(req.team.id, req.body, function (err, team) {
		if (err) return next(err);
		
		var socketio = req.app.get('socketio'); // tack out socket instance from the app container
		socketio.sockets.emit('team.edited', team); // emit an event for all connected clients
		
		res.json(team);
	});
});

/* DELETE a particular team by its id */
router.delete('/teams/:team', function(req, res, next) {
	Team.findByIdAndRemove(req.team.id, req.body, function (err, team) {
		if (err) return next(err);
		
		var socketio = req.app.get('socketio'); // tack out socket instance from the app container
		socketio.sockets.emit('team.deleted', team); // emit an event for all connected clients
		
		res.json(team);
	});
});

/* POST (add) a new task */
router.post('/teams/:team/tasks', function(req, res, next) {
	var task = new Task(req.body);
	task.team = req.team;

	task.save(function(err, task){
		if(err){ return next(err); }

		req.team.scrumTasks.push(task);
		req.team.save(function(err, team) {
			if(err){ return next(err); }

			res.json(task);
		});
	});
});

/* PUT (update) a particular task by its id */
router.put('/teams/:team/tasks/:task', function(req, res, next) {
	Task.findByIdAndUpdate(req.body.id, req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* DELETE a particular task by its id */
router.delete('/teams/:team/tasks/:task', function(req, res, next) {
	var urlSections = req.url.split('/');
	
	Task.findByIdAndRemove(urlSections[4], req.body, function (err, post) {
		if (err) return next(err);
		
		req.team.scrumTasks.pull(urlSections[4]);
		req.team.save(function(err, team) {
			if(err){ return next(err); }

			res.json(post);
		});
	});
});

module.exports = router;
