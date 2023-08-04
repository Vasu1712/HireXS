const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');

router.post('/register', async (req, res) => {
	const { email, password, firstName, lastName, username } = req.body;

	const user = await User.findOne({ email: email });

	if (user) {
		return res
			.status(403)
			.json({ error: 'A user with this email already exists' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUserData = {
		email,
		password: hashedPassword,
		firstName,
		lastName,
		username,
	};
	const newUser = await User.create(newUserData);
	console.log(newUserData);

	const token = await getToken(email, newUser);

	const userToReturn = { ...newUser.toJSON(), token };
	console.log(userToReturn);
	delete userToReturn.password;
	return res.status(200).json(userToReturn);
});

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });
	if (!user) {
		return res.status(403).json({ err: 'Invalid credentials' });
	}

	console.log(user);

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return res.status(403).json({ err: 'Invalid credentials' });
	}

	const token = await getToken(user.email, user);
	const userToReturn = { ...user.toJSON(), token };
	delete userToReturn.password;
	return res.status(200).json(userToReturn);
});

router.post('/registerjob', async (req, res) => {
	const { collegeName, gradePoint, resumeLink, jobId } = req.body;

	// Find the job using the provided jobId
	const job = await JobModel.findOne({ jobId });

	if (!job) {
		throw new Error('Job not found');
	}

	// Create a new CVanalysis object
	const cvAnalysisData = {
		grade: gradePoint,
		instituteName: collegeName,
		resume: resumeLink,
		description: job.description, // Use the job's description
	};

	// Save the CVanalysis data to the database
	const cvAnalysis = new CVModel(cvAnalysisData);
	const savedCVAnalysis = await cvAnalysis.save();

	return savedCVAnalysis;
});

module.exports = router;
