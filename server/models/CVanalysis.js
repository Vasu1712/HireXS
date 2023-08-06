const mongoose = require('mongoose');

const CVanalysis = new mongoose.Schema({
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
		//reference to user
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

const CVModel = mongoose.model('CVanalysis', CVanalysis);

module.exports = CVModel;
