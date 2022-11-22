const express = require("express");
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const adminAuthenticate = require('../middleware/adminAuthenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const User = require('../models/user');

// router.get(`/adminCheck/:userId`, async (req, res) => {
//     const user = await User.findOne({_id: req.params.userId});
// 	if (user === null) return res.sendStatus(404);

// 	return res.json({isAdmin: user.isAdmin});
// });

router.use(authenticate);
router.use(adminAuthenticate);

router.get('/clubs', async (req, res) => {
	return res.json(await Club.find({approved: false}));
});

router.patch('/clubs/:clubID', async (req, res) => {
	const dbRes = await Club.updateOne({_id: req.params.clubID}, {approved: req.body.approved});
});

module.exports = router;