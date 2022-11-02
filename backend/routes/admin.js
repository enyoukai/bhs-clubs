const express = require("express");
const router = express.Router();
const authenticate = require('../authenticate');
const admin = require('firebase-admin');
const Club = require("../models/clubs");

router.use(authenticate);

router.get('/', async (req, res) => {
	return res.json({pee: pee});
});

module.exports = router;