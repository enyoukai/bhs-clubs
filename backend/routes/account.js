const express = require("express");
const router = express.Router();
const authenticate = require('../authenticate');

router.use(authenticate);

router.get('/', async (req, res) => {
	return res.send(req.headers.uid);
});
module.exports = router;