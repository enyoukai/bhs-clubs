const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const admin = require('firebase-admin');
const Post = require("../models/posts");
const Club = require("../models/clubs");

const upload = require('../middleware/upload');

router.get('/', async (req, res) => {
	Post.find().populate('club').exec(function(err, posts) {
		if (err)
		{
			return res.sendStatus(500);
		}
		return res.json(posts);
	})
});

router.use(authenticate);

router.post('/', upload.single('file'), async (req, res) => {
	console.log(req.file);
	if (!req.body.title || !req.body.body || !req.body.club) return res.sendStatus(400);

	const post = new Post({title: req.body.title, body: req.body.body, author: req.headers.uid, club: req.body.club, file: req.file.filename});
	post.save();

	return res.sendStatus(201);
});	

module.exports = router;