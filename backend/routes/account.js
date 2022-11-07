const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const User = require('../models/user');

router.get('/:userId', async (req, res) => {
	const user = await admin.auth().getUser(req.params.userId);
	const clubs = await Club.find({uid: req.params.userId});
	
	return res.json({email: user.email, creationTime : user.metadata.creationTime, clubs: clubs});
});

router.use(authenticate);

router.get('/', async (req, res) => {
	return res.send(req.headers.uid);
});

router.post('/', async (req, res) => {
	const user = new User({_id: req.headers.uid, username: req.headers.uid});
	await user.save();

	return res.sendStatus(201);
});

module.exports = router;