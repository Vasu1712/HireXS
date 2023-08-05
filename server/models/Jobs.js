const mongoose = require('mongoose');

const Job = new mongoose.Schema({
	jobTitle: {
		type: String,
		required: true,
	},
	jobId: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	salary: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	applicationDate: {
		type: Date,
		required: true,
	},
	jobType: {
		type: String,
		required: true,
	},
	experience: {
		type: String,
		required: true,
	},
});

const JobModel = mongoose.model('Job', Job);

module.exports = JobModel;
