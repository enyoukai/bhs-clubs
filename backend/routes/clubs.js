require('dotenv').config();
const express = require("express");
const { StatusCode } = require("status-code-enum");

const Club = require("../models/clubs");
const User = require("../models/users");
const Claim = require("../models/claims");

const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', async (req, res) => {
	if (Object.keys(req.query).length === 0) {
		const approvedClubs = await Club.find({ approved: true }).collation({locale: 'en', strength: 2}).sort('name');

		approvedClubs.forEach(club => club.dates.sort());

		return res.json(approvedClubs);
	}
	else {
		const allClubs = await Club.find({ approved: true, name: { $regex: req.query.name, $options: 'i' } }).sort('name');
		allClubs.forEach(club => club.dates.sort());

		return res.json(allClubs);
	}
});

router.get('/:clubId', async (req, res) => {
	const club = await Club.findOne({ _id: req.params.clubId, approved: true }).populate('officers');
	if (club === null) return res.sendStatus(StatusCode.ClientErrorNotFound);

	club.dates.sort();

	return res.json(club);
});

router.get('/:id/members', async (req,res) => {
	if (!(await Club.exists({_id: req.params.id}))) return res.send("Club not found").status(StatusCode.ClientErrorNotFound);

	return res.json((await Club.findOne({_id: req.params.id}).populate('members')).members);
});

router.use(authenticate);

router.patch('/:clubId', async (req, res) => {
	const club = await Club.findOne({ _id: req.params.clubId });
	const user = await User.findOne({_id: req.headers.uid});

	if (club === null) return res.sendStatus(StatusCode.ClientErrorNotFound);
	if (!club.officers.includes(req.headers.uid) && !user.isAdmin) return res.sendStatus(StatusCode.ClientErrorForbidden);

	await Club.updateOne({ _id: req.params.clubId }, {$set: req.body});

	return res.sendStatus(StatusCode.SuccessOK);
});

router.delete('/:id', async (req, res) => {
	const clubId = req.params.id;

	const club = await Club.findOne({ _id: clubId });
	const user = await User.findOne({ _id: req.headers.uid });

	if (club === null) {
		return res.sendStatus(StatusCode.ClientErrorNotFound);
	}
	if (!club.officers.includes(user.id) && !user.isAdmin) {
		return res.sendStatus(StatusCode.ClientErrorForbidden);
	}

	await Club.deleteOne({ _id: clubId })

	return res.sendStatus(StatusCode.SuccessOK);
});

router.post('/', upload.single('verification'), async (req, res) => {
	const body = {};
	const user = await User.findOne({ _id: req.headers.uid });

	Object.keys(req.body).forEach((key) => { body[key] = JSON.parse(req.body[key]) });

	if (!body.name || !body.description || !body.location || !body.dates || !body.time || !body.advisor || !body.tags) {
		return res.sendStatus(StatusCode.ClientErrorBadRequest);
	}

	const club = new Club({ name: body.name, description: body.description, location: body.location, dates: body.dates, time: body.time, advisor: body.advisor, approved: user.isAdmin, verification: req.file.filename, officers: [req.headers.uid], tags: body.tags });
	await club.save();

	await User.updateOne({ _id: req.headers.uid }, { $push: { clubs: club._id } });

	return res.sendStatus(StatusCode.SuccessCreated);
});

router.get('/:id/info', async (req, res) => {
	const club = await Club.find({ _id: req.params.id });
	if (club === null) return res.send("Club not found").status(StatusCode.ClientErrorNotFound);

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
	return res.sendStatus(StatusCode.SuccessOK);
});

router.post('/:id/claims', upload.single('verification'), async (req, res) => {
	// TODO: stop multiple requests from same user

	const claim = new Claim({ club: req.body.club, author: req.headers.uid, verificationURL: req.file.filename });
	claim.save();

	res.sendStatus(StatusCode.SuccessOK);
});

module.exports = router;