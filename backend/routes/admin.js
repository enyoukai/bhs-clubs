const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminAuthenticate = require('../middleware/adminAuthenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const User = require('../models/user');
const Claims = require("../models/claims");

// router.get(`/adminCheck/:userId`, async (req, res) => {
//     const user = await User.findOne({_id: req.params.userId});
// 	if (user === null) return res.sendStatus(404);

// 	return res.json({isAdmin: user.isAdmin});
// });

router.use(authenticate);
router.use(adminAuthenticate);

// really inefficient idk wtv i'm too tired tod o anything about this
router.get('/clubs', async (req, res) => {
	return res.json(await Club.find());
});

router.get('/claims', async (req, res) => {
	Claims.find().populate('club').populate('author').exec(function(err, claims) {
		return res.send(claims);
	});
});

router.patch('/clubs/:clubID', async (req, res) => {
	const dbRes = await Club.updateOne({ _id: req.params.clubID }, { approved: req.body.approved });
});

router.put('/claims/:claimId', async (req, res) => {
	const claim = await Claims.findOne({id: req.params.claimId});
	if (!claim) return res.sendStatus(404);
	
	if (req.body.approved)
	{
		await Club.updateOne(
			{ _id: claim.club},
			{ $push: {officers: req.headers.uid}}
		);
	}

	await Claims.deleteOne({_id: claim.id});

});


module.exports = router;