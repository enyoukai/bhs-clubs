const express = require("express");
const router = express.Router();
const authenticate = require('../authenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");


router.get('/clubs', async (req, res) => {
	return res.json(await Club.find({approved: false}));
});

// router.use(authenticate);


module.exports = router;