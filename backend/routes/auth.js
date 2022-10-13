const express = require("express");
const router = express.Router();

router.post('/register', async (req, res) => {
	return res.send(req.body);
});

router.post('/login', async (req, res) => {
	return res.send(req.body);
});

module.exports = router;