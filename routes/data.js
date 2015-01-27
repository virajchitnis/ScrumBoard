var express = require('express');
var router = express.Router();

/* GET all data listing. */
router.get('/', function(req, res, next) {
	var alldata = [
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
	res.send(alldata);
});

module.exports = router;
