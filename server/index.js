const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

const mongoUrl = 'mongodb+srv://mahirakajaria:NL1htAGffe0TLscA@cluster0.estoffi.mongodb.net/?retryWrites=true&w=majority';
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
		return res.json(jobs);
	} catch (error) {
		res.status(500).json({ message: 'Error fetching jobs' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
