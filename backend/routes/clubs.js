require('dotenv').config();
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const express = require("express");
const authenticate = require('../middleware/authenticate');

const {
	v1: uuidv1,
	v4: uuidv4,
} = require('uuid');

const router = express.Router();
  
router.get('/', async (req, res) => {
	if (Object.keys(req.query).length === 0)
	{
		return res.json(await Club.find({approved: true}));
	}

	return res.json(await Club.find({name: {$regex: req.query.name, $options: 'i'}}));
});

router.get('/:clubId', async (req, res) => {
	const club = await Club.findOne({id: req.params.clubId, approved: true});
	return res.send(club);
});

router.use(authenticate);

router.put('/:clubId', async (req, res) => {
	const club = await Club.findOne({id: req.params.clubId});
	if (club.uid != req.headers.uid) return res.sendStatus(401);
	
	const dbRes = await Club.updateOne({id: req.params.clubId}, {name: req.body.name, description: req.body.description, location: req.body.location, date: req.body.date, time: req.body.time, advisor: req.body.advisor});
	
	if (dbRes.acknowledged)
	{
		return res.sendStatus(200);
	}
	else
	{
		return res.sendStatus(400);
	}
});

router.delete('/:clubId', async (req, res) => {
	const clubId = req.params.clubId;
	
	if (await Club.exists({id: clubId}))
	{
		await Club.deleteOne({id: clubId});
		return res.sendStatus(200);
	}
	else
	{
		res.sendStatus(400);
	}
});

router.post('/', (req, res) => {
	const clubId = uuidv4();
	const club = new Club({name: req.body.name, description: req.body.description, location: req.body.location, date: req.body.date, time: req.body.time, advisor: req.body.advisor, id: clubId, uid: req.headers.uid, approved: false});
	club.save();

	return res.send(club);
});
module.exports = router;