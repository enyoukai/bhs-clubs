require('dotenv').config();
const admin = require('firebase-admin');
const Club = require("../models/clubs");
const User = require("../models/user");
const Claim = require("../models/claims");

const express = require("express");
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', async (req, res) => {
	if (Object.keys(req.query).length === 0) {
		return res.json(await Club.find({ approved: true }).sort('name'));
	}

	return res.json(await Club.find({ approved: true, name: { $regex: req.query.name, $options: 'i' } }).sort('name'));
});

router.get('/:clubId', async (req, res) => {
	const club = await Club.findOne({ _id: req.params.clubId, approved: true });
	if (club === null) return res.sendStatus(404);

	return res.send(club);
});

router.use(authenticate);

router.put('/:clubId', async (req, res) => {
	const club = await Club.findOne({ _id: req.params.clubId });
	if (club === null) return res.sendStatus(404);
	if (!club.officers.includes(req.headers.uid)) return res.sendStatus(401);

	const dbRes = await Club.updateOne({ _id: req.params.clubId }, { name: req.body.name, description: req.body.description, location: req.body.location, date: req.body.date, time: req.body.time, advisor: req.body.advisor, infoPage: req.body.infoPage });

	if (dbRes.acknowledged) {
		return res.sendStatus(200);
	}
	else {
		return res.sendStatus(400);
	}
});

router.delete('/:id', async (req, res) => {
	const clubId = req.params.id;
	const club = await Club.findOne({ _id: clubId });
	const user = await User.findOne({ _id: req.headers.uid });
	if (!club) {
		return res.sendStatus(404);
	}
	else if (!club.officers.includes(user.id) && !user.isAdmin) {
		return res.sendStatus(401);
	}
	else {
		await Club.deleteOne({ _id: clubId })
		return res.sendStatus(200);
	}
});

router.post('/', upload.single('verification'), async (req, res) => {
	const body = {};
	const user = await User.findOne({ _id: req.headers.uid });

	Object.keys(req.body).forEach((key) => { body[key] = JSON.parse(req.body[key]) });

	if (!body.name || !body.description || !body.location || !body.dates || !body.time || !body.advisor || !body.tags) {
		return res.sendStatus(400);
	}

	const club = new Club({ name: body.name, description: body.description, location: body.location, dates: body.dates, time: body.time, advisor: body.advisor, approved: user.isAdmin, verification: req.file.filename, officers: [req.headers.uid], tags: body.tags });
	await club.save();

	await User.updateOne({ _id: req.headers.uid }, { $push: { clubs: club._id } });

	return res.send(club);
});

router.get('/:id/info', async (req, res) => {
	const club = await Club.find({ _id: req.params.id });
	if (club === null) return res.send("Club not found").status(404);

	return res.send(club.infoFormat);
})

router.put('/:id/info', upload.any('images'), async (req, res) => {
	const items = JSON.parse(req.body.items);

	const processedItems = items.map((item) => {
		if (item.type === 'text' || item.type === 'img-link') return item;
		else if (item.type === 'img-file') {
			return { type: 'img-link', content: req.files[item.content].filename }
		}
	});

	await Club.updateOne({ _id: req.params.id }, { infoFormat: processedItems });
	return res.sendStatus(201);
});

router.post('/:id/claims', upload.single('verification'), async (req, res) => {
	// TODO: stop multiple requests from same user

	const claim = new Claim({ club: req.body.club, author: req.headers.uid, verificationURL: req.file.filename });
	claim.save();

	res.sendStatus(200);
});

module.exports = router;