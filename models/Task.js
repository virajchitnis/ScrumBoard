var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
	section: String,
	details: String,
	assignee: String,
	sprint: String,
	color: String
	team: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Team'
	}
});

module.exports = mongoose.model('Task', TaskSchema);