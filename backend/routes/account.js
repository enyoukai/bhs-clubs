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
	let isAdmin = false;
	if (req.headers.email === process.env.ADMIN) isAdmin = true;
	const fbUser = await admin.auth().getUser(req.headers.uid);

	const user = new User({_id: req.headers.uid, username: req.body.username, email: req.headers.email, creationTime: fbUser.metadata.creationTime, isAdmin: isAdmin});
	await user.save();

	return res.sendStatus(201);
});

router.post('/:userId/clubs', async (req, res) => {
	if (!Club.exists({_id: req.body.clubId})) return res.sendStatus(404);
		
	await User.updateOne(
		{_id: req.params.userId}, 
		{$push: {clubs: req.body.clubId}});

	await Club.updateOne(
		{_id: req.body.clubId},
		{$push: {members: req.params.userId}});

	return res.sendStatus(201);
});

router.get('/:userId/unreadPosts', async (req, res) => {
	if (req.params.userId !== req.headers.uid) return res.send("Cannot access this resource").status(400);

	User.findOne({_id: req.headers.uid}).
		populate('unreadPosts').
		exec(function (err, user) {
			if (err) return res.sendStatus(500);
			return res.send(user.unreadPosts);
		})
});

router.delete('/:userId/unreadPosts', async (req, res) => {
	if (req.params.userId !== req.headers.uid) return res.send("Cannot access this resource").status(400);

	await User.updateOne({_id: req.headers.uid}, {unreadPosts: []});
});

module.exports = router;