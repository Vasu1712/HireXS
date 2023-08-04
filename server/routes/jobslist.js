const express = require('express');
const passport = require('passport');
const JobModel = require('../models/Jobs');

const router = express.Router();

router.use(passport.initialize());

router.get('/jobs', async (req, res) => {
	try {
		const jobs = await JobModel.find({});
		console.log(jobs);
		return res.json(jobs);
	} catch (error) {
		console.error('Error fetching jobs:', error);
		res.status(500).json({ message: 'Error fetching jobs' });
	}
});

router.post(
	'/createjob',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			if (!req.body || Object.keys(req.body).length === 0) {
				return res.status(400).json({ message: 'Request body is empty' });
			}

			const existingJob = await JobModel.findOne({ jobId });

			if (existingJob) {
				return res
					.status(409)
					.json({ message: 'Job with the same jobId already exists' });
			}

			const newJob = await JobModel.create(req.body);

			res.json(newJob);
		} catch (error) {
			console.error('Error creating job:', error);
			res.status(500).json({ message: 'Error creating job' });
		}
	}
);

module.exports = router;
