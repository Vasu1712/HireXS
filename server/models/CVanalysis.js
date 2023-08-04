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
		type: Date,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const CVModel = mongoose.model('CVanalysis', CVanalysis);

module.exports = CVModel;
