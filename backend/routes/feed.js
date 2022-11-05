const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const admin = require('firebase-admin');
const Post = require("../models/posts");

router.get('/', async (req, res) => {
	console.log(await Post.find());
	return res.send(await Post.find());
});

router.use(authenticate);

router.post('/', (req, res) => {
	const post = new Post({title: req.body.title, body: req.body.body, author: req.headers.uid});
	post.save();

	return res.sendStatus(200);
});

module.exports = router;