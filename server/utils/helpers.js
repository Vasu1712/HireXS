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

const llmApiUrl = 'https://35f8-110-235-216-75.ngrok-free.app';
exports.getScore = async (url) => {
	const response = await fetch(llmApiUrl + url, {
		method: 'GET'
	});
	const formattedResponse = await response.json();
	return formattedResponse;
}

module.exports = exports;
