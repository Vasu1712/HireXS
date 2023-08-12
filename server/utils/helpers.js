const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

exports = {};

exports.getToken = async (email, user) => {
	const token = jwt.sign(
		{ identifier: user._id },
		'thisKeyIsSupposedToBeSecret'
	);
	return token;
};

const llmApiUrl = 'https://axisapi.onrender.com';
exports.getScore = async (url) => {
	const response = await fetch(llmApiUrl + url, {
		method: 'GET'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

exports.newDescription = async (url) => {
	const response = await fetch(llmApiUrl + url, {
		method: 'POST'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

exports.testLink = async ({ email, job_id }) => {
	const response = await fetch(llmApiUrl + '/TestMail?email=' + email + '&job_id=' + job_id, {
		method: 'POST'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

exports.interviewLink = async (email) => {
	const response = await fetch(llmApiUrl + '/SelectMail?email=' + email, {
		method: 'POST'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

module.exports = exports;
