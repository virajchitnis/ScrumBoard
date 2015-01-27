var express = require('express');
var router = express.Router();

/* GET all data listing. */
router.get('/', function(req, res, next) {
	var alldata = [
		{
			"teamName": "Faculty Affairs Application System",
			"teamMembers": "John Curran, Brandon Bobo, Nicole Maalouf & Viraj Chitnis",
			"teamDescription": "Database system for the Faculty Affairs Office at Temple University.",
			"teamSecret": "xyzxyzxyz",
			"teamBacklog": true,
			"teamCompleted": true,
			"teamSprintNums": 3,
			"scrumItems": [
				{
					"itemSection": "UI",
					"itemDetails": "Add captcha to the forms.",
					"itemAssignee": "Viraj Chitnis",
					"itemSprintNum": "1",
					"itemColor": "blue"
				},
				{
					"itemSection": "Back-End",
					"itemDetails": "Make stored procedures.",
					"itemAssignee": "Nicole Maalouf",
					"itemSprintNum": "1",
					"itemColor": "pink"
				}
			]
		}
	
	];
	res.send(alldata);
});

module.exports = router;
