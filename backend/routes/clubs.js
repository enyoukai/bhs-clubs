const express = require("express")
const router = express.Router()


let clubs = [];
  
router.get('/', (req, res) => {
	return res.send(Object.values(clubs));
});

router.get('/:clubId', (req, res) => {
	return res.send(clubs[req.params.clubId]);
});

router.post('/', (req, res) => {
	clubs.push({name: req.body['clubName']})
	return res.send('post request');
});

router.put('/:clubId', (req, res) => {
	return res.send(`put request on ${req.params.clubId} id`);
});

router.delete('/:clubId', (req, res) => {
	return res.send(`delete request ${req.params.clubId} id`);
});

module.exports = router;