const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const admin = require('firebase-admin');
const Post = require("../models/posts");
const Club = require("../models/clubs");
const User = require("../models/user");

const upload = require('../middleware/upload');
const { default: mongoose } = require("mongoose");

router.get('/', async (req, res) => {
	Post.find().populate('club').populate('author').exec(function(err, posts) {
		if (err)
		{
			return res.sendStatus(500);
		}
		return res.json(posts);
	})
});

router.use(authenticate);

router.post('/', upload.single('file'), async (req, res) => {
	const user = await User.findOne({_id: req.headers.uid});
	console.log(user._id);
	console.log(req.body.club);

	if (!req.body.title || !req.body.body || !req.body.club) return res.sendStatus(400);

	const post = new Post({title: req.body.title, body: req.body.body, author: user._id, club: req.body.club, file: (req.file ? req.file.filename : '')});
	post.save();

	return res.sendStatus(201);
});	

module.exports = router;