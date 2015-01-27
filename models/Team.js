var mongoose = require('mongoose');

var TeamSchema = new mongoose.Schema({
	name: String,
	members: String,
	description: String,
	secret: String,
	backlog: Boolean,
	completed: Boolean,
	sprints: Number,
	scrumTasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Task'
		}
	]
});

module.exports = mongoose.model('Team', TeamSchema);