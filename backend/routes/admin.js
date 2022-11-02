const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminAuthenticate = require('../middleware/adminAuthenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");

router.get(`/adminCheck/:userID`, async (req, res) => {
	console.log("here");
	return res.json({isAdmin: req.params.userID === process.env.ADMIN});
});

router.use(authenticate);
router.use(adminAuthenticate);

router.get('/clubs', async (req, res) => {
	return res.json(await Club.find({approved: false}));
});

router.patch('/clubs/:clubID', async (req, res) => {
	const dbRes = await Club.updateOne({id: req.params.clubID}, {approved: req.body.approved});
});

module.exports = router;