const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const admin = require('firebase-admin');
const Post = require("../models/posts");
const Club = require("../models/clubs");

router.get('/', async (req, res) => {
	return res.send(await Post.find());
});

router.use(authenticate);

router.post('/', async (req, res) => {
	console.log(req.body.club);
	const club = await Club.findOne({id: req.body.club});
	console.log(club);
	const post = new Post({title: req.body.title, body: req.body.body, author: req.headers.uid, club: club});
	post.save();

	return res.sendStatus(200);
});

module.exports = router;