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

router.get('/:userId/clubs', async (req, res) => {
	if (!(await User.exists({_id: req.params.userId}))) return res.sendStatus(404);
	
	const user = await User.findOne({_id: req.params.userId});
	return res.send(user.clubs);
});

router.use(authenticate);

router.get('/', async (req, res) => {
	return res.send(req.headers.uid);
});

router.post('/', async (req, res) => {
	let isAdmin = false;
	if (req.headers.email === process.env.ADMIN) isAdmin = true;

	const user = new User({_id: req.headers.uid, username: req.body.username, email: req.headers.email, isAdmin: isAdmin});
	user.save();
	
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
	if (!(await User.exists({_id: req.headers.uid})));

	await User.updateOne({_id: req.headers.uid}, {unreadPosts: []});
});

router.delete('/:userId/club/:clubId', async (req, res) => {
	if (req.params.userId !== req.headers.uid) return res.sendStatus(400);
	const user = User.findOne({_id: req.headers.userId});
	const club = Club.findOne({_id: req.headers.clubId});

	if (user === null) return res.send("User not found").status(404);
	if (club === null) return res.send("Club not found").status(404);

	

	await User.updateOne({_id: req.params.userId}, {
		$pullAll: {
			clubs: [{_id: req.params.clubId}],
		},
	});

	await Club.updateOne({_id: req.params.clubId}, {
		$pullAll: {
			officers: [{_id: req.params.userId}],
			members: [{_id: req.params.userId}],
		},
	});
	
	return res.sendStatus(200);

});

module.exports = router;