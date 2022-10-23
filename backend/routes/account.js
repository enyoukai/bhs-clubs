const express = require("express");
const router = express.Router();
const authenticate = require('../authenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");

router.get('/:userId', async (req, res) => {
	const user = await admin.auth().getUser(req.params.userId);
	const clubs = await Club.find({userId: req.params.userId});
	console.log(clubs);
	
	return res.json({email: user.email, creationTime : user.metadata.creationTime, clubs: clubs});
});

router.use(authenticate);

router.get('/', async (req, res) => {
	return res.send(req.headers.uid);
});

module.exports = router;