const express = require('express');
const router = express.Router();
const User = require('../models/User');
const JobModel = require('../models/Jobs');
const CVModel = require('../models/CVanalysis');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');
const passport = require('passport');

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

router.post(
	'/registerjob',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { collegeName, gradePoint, resumeLink, jobId } = req.body;
		// console.log(req.body);
		const userId = req.user._id;
		const job = await JobModel.findOne({ jobId: jobId });
		console.log(job);
		const user = await User.findById(userId);

		try {
			const newCV = await CVModel.create({
				grade: gradePoint,
				instituteName: collegeName,
				resume: resumeLink,
				description: job.description,
			});

			user.cv = newCV._id;
			await user.save();

			return res.status(200).json({ message: 'CV added successfully' });
		} catch (error) {
			console.log(error);
			console.error('Error adding CV:', error);
			return res.status(500).json({ error: 'Internal server error' });
		}
	}
);

module.exports = router;
