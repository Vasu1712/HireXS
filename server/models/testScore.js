const mongoose = require('mongoose');

const TestScore = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    jobid: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    }
});

const TestScoreModel = mongoose.model('TestScore', TestScore);

module.exports = TestScoreModel;
