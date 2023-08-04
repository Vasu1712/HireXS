const express = require('express');
const passport = require('passport');
const Institute = require('../models/Institute');

const router = express.Router();

router.get('/institutes', async (req, res) => {
	try {
		const institutes = await Institute.find();
		res.json(institutes);
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch institutes' });
	}
});

module.exports = router;
