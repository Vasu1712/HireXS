const express = require('express');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobslist');
const instituteNames = require('./routes/institutenames');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mongoose
	.connect(
		'mongodb+srv://mahirakajaria:' +
			process.env.MONGO_PASSWORD +
			'@cluster0.estoffi.mongodb.net/',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((x) => {
		console.log('Connected to Mongo!');
	})
	.catch((err) => {
		console.log(err);
	});

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyIsSupposedToBeSecret';
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ _id: jwt_payload.identifier }, function (err, user) {
			// done(error, doesTheUserExist)
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);

app.get('/', (req, res) => {
	res.send('Hello World');
});
app.use('/auth', authRoutes);
app.use('/jobslist', jobRoutes);
app.use('/institutenames', instituteNames);

app.listen(port, () => {
	console.log('App is running on port ' + port);
});
