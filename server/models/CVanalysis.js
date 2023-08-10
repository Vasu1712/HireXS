const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
	jobId: {
		type: String,
		required: true,
	},
	grade: {
		type: Number,
		required: true,
	},
	instituteName: {
		type: String,
		required: true,
	},
	resume: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	score: {
		type: Number,
		required: true,
	},
	testScore: {
		type: Number,
		required: true,
	}
});

const CVModel = mongoose.model('CV', CVSchema);

module.exports = CVModel;