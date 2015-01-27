var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Team = require('../models/Team.js');

/* GET all teams. */
router.get('/', function(req, res, next) {
	Team.find(function (err, data) {
		if (err) return next(err);
		res.json(data);
	});
	/*var alldata = [
		{
			"name": "Faculty Affairs Application System",
			"members": "John Curran, Brandon Bobo, Nicole Maalouf & Viraj Chitnis",
			"description": "Database system for the Faculty Affairs Office at Temple University.",
			"secret": "xyzxyzxyz",
			"backlog": true,
			"completed": true,
			"sprints": 3,
			"scrumItems": [
				{
					"section": "UI",
					"details": "Add captcha to the forms.",
					"assignee": "Viraj Chitnis",
					"sprint": "1",
					"color": "blue"
				},
				{
					"section": "Back-End",
					"details": "Make stored procedures.",
					"assignee": "Nicole Maalouf",
					"sprint": "1",
					"color": "pink"
				}
			]
		}
	
	];
	res.send(alldata);*/
});

/* POST (add) a new team */
router.post('/teams', function(req, res, next) {
  var team = new Team(req.body);

  team.save(function(err, team){
    if(err){ return next(err); }

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
  res.json(req.team);
});

module.exports = router;
