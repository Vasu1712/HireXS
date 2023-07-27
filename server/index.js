const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

const mongoUrl = 'mongodb://localhost:27017/jobDB';
mongoose
	.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB successfully'))
	.catch((err) => console.error('Error connecting to MongoDB:', err));

const jobSchema = new mongoose.Schema({
	jobTitle: String,
	jobId: String,
	location: String,
	salary: String,
	description: String,
	applicationDate: Date,
});

const Job = mongoose.model('Job', jobSchema);

app.get('/jobs', async (req, res) => {
	try {
		const jobs = await Job.find({});
		res.json(jobs);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching jobs' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
