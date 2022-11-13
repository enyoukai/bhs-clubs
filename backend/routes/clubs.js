require('dotenv').config();
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const express = require("express");
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', async (req, res) => {
	if (Object.keys(req.query).length === 0)
	{
		return res.json(await Club.find({approved: true}));
	}

	return res.json(await Club.find({name: {$regex: req.query.name, $options: 'i'}}));
});

router.get('/:clubId', async (req, res) => {
	const club = await Club.findOne({_id: req.params.clubId, approved: true});
	return res.send(club);
});

router.use(authenticate);

router.put('/:clubId', async (req, res) => {
	const club = await Club.findOne({_id: req.params.clubId});
	if (club.uid != req.headers.uid) return res.sendStatus(401);
	
	const dbRes = await Club.updateOne({_id: req.params.clubId}, {name: req.body.name, description: req.body.description, location: req.body.location, date: req.body.date, time: req.body.time, advisor: req.body.advisor, infoPage: req.body.infoPage});
	
	if (dbRes.acknowledged)
	{
		return res.sendStatus(200);
	}
	else
	{
		return res.sendStatus(400);
	}
});

router.delete('/:id', async (req, res) => {
	const id = req.params.id;
	const uid = req.headers.uid;
	const club = await Club.find({_id: id});

	if (!club)
	{
		return res.sendStatus(404);
	}
	else if (uid !== club.uid && uid !== process.env.ADMIN)
	{
		return res.sendStatus(401);
	}
	else (await Club.exists({_id: id}))
	{
		return res.sendStatus(200);
	}
});

router.post('/', upload.single('verification'), async (req, res) => {
	console.log(req.file);
	const body = req.body;
	if (body.name == '' || body.description == '' || body.location == '' || body.date == '' || body.time == '' || body.advisor == '') 
	{
		return res.sendStatus(400);
	}

	const club = new Club({name: req.body.name, description: req.body.description, location: req.body.location, date: req.body.date, time: req.body.time, advisor: req.body.advisor, uid: req.headers.uid, approved: false, verification: req.file.filename, infoPage: ""});
	await club.save();

	return res.send(club);
});

router.post('/:id/upload', upload.single('clubImage'), async (req, res) =>
{
	await Club.updateOne({_id: req.params.id}, {img: req.file.filename});

	return res.sendStatus(200);
});


router.put('/:id/info', async (req, res) => {
	await Club.updateOne({_id: req.params.id}, {infoFormat: req.body});
	return res.sendStatus(201);
});

module.exports = router;