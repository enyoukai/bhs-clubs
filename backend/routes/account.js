const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const User = require('../models/user');


router.get('/:userId', async (req, res) => {
	User.findOne({_id: req.params.userId}).populate('clubs').exec(function(err, user) {
		if (err) return res.sendStatus(500);
		return res.send(user);
	});
});

router.use(authenticate);

router.get('/', async (req, res) => {
	return res.send(req.headers.uid);
});

router.post('/', async (req, res) => {
	const fbUser = await admin.auth().getUser(req.headers.uid);

	const user = new User({_id: req.headers.uid, username: req.body.username, email: req.headers.email, creationTime: fbUser.metadata.creationTime});
	await user.save();

	return res.sendStatus(201);
});

module.exports = router;