const express = require('express');
const passport = require('passport');
const JobModel = require('../models/Jobs');

const router = express.Router();

router.use(passport.initialize());

router.get('/jobs', async (req, res) => {
	try {
		const jobs = await JobModel.find({});
		return res.json(jobs);
	} catch (error) {
		console.error('Error fetching jobs:', error);
		res.status(500).json({ message: 'Error fetching jobs' });
	}
});

router.get('/jobs/:jobid', async (req, res) => {
	try {
		const job = await JobModel.findOne({ jobId: req.params.jobid });
		if (!job) {
			return res.status(404).json({ message: 'Job not found' });
		}
		return res.json(job);
	} catch (error) {
		console.error('Error fetching job:', error);
		res.status(500).json({ message: 'Error fetching job' });
	}
});

router.delete('/jobs/delete/:jobid', async (req, res) => {
	try {
		const job = await JobModel.findOne({ jobId: req.params.jobid });
		if (!job) {
			return res.status(404).json({ message: 'Job not found' });
		}
		const deletedJob = await JobModel.deleteOne({ _id: job._id });
		if (deletedJob.deletedCount === 0) {
			return res.status(404).json({ message: 'Job not found' });
		}
		return res.status(200).json({ success: true, message: 'Job deleted successfully' });
	} catch (error) {
		console.error('Error deleting job:', error);
		res.status(500).json({ message: 'Error deleting job' });
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

			const existingJob = await JobModel.findOne({ jobId: req.body.jobId });

			if (existingJob) {
				return res
					.status(409)
					.json({ message: 'Job with the same jobId already exists' });
			}

			const newJob = await JobModel.create(req.body);

			res.json(newJob);
		} catch (error) {
			console.error('Error creating job:', error);
			res.status(500).json({ message: { error } });
		}
	}
);

module.exports = router;
