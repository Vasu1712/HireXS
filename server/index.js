// app.js
const express = require('express');
const mongodb = require('mongodb');
const app = express();
const MongoClient = mongodb.MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'jobDB';
const port = 3000;

MongoClient.connect(
	mongoUrl,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		if (err) {
			console.error('Error connecting to MongoDB:', err);
			return;
		}

		console.log('Connected to MongoDB successfully');
		const db = client.db(dbName);

		// Start the server after connecting to the database
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	}
);
