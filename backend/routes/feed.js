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
	Post.find().sort({createdAt: -1}).populate('club').populate('author').exec(function(err, posts) {
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
	if (user === null) return res.send("User not found").status(404);

	if (!req.body.title || !req.body.body || !req.body.club) return res.send("Missing fields").status(400);
	if (!(await Club.exists({_id: req.body.club}))) return res.send("Club not found").status(404);

	const post = new Post({title: req.body.title, body: req.body.body, author: user._id, club: req.body.club, file: (req.file ? req.file.filename : '')});
	await post.save();

	const club = await Club.findOne({_id: req.body.club});
	club.officers.forEach(async (memberId) => {
		await User.updateOne({_id: memberId}, {$push: {'unreadPosts': post.id}});
	});

	return res.sendStatus(201);
});	

module.exports = router;