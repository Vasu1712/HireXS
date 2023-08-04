const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
	name: { type: String, required: true },
});

const Institute = mongoose.model('Institute', instituteSchema, 'institutes'); // <-- Add the collection name 'institutes' here

module.exports = Institute;
