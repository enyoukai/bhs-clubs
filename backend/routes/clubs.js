const express = require("express");
const {
	v1: uuidv1,
	v4: uuidv4,
} = require('uuid');

const router = express.Router();

let clubs = {};
  
router.get('/', (req, res) => {
	return res.json(Object.values(clubs));
});

router.get('/:clubId', (req, res) => {
	return res.send(clubs[req.params.clubId]);
});

router.post('/', (req, res) => {
	const clubId = uuidv4();
	
	clubObj = {clubName: req.body['clubName'], clubId: clubId};
	clubs[clubId] = clubObj;

	return res.send(clubObj);
});

router.put('/:clubId', (req, res) => {
	const clubId = req.params.clubId;
	
	if (clubId in clubs)
	{
		clubs[clubId] = req.params;
		return res.sendStatus(200);
	}
	else
	{
		res.sendStatus(400);
}});

router.delete('/:clubId', (req, res) => {
	const clubId = req.params.clubId;
	
	if (clubId in clubs)
	{
		delete clubs[clubId];
		return res.sendStatus(200);
	}
	else
	{
		res.sendStatus(400);
	}
});

module.exports = router;