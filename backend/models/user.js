const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id: String,
	username: String,
	clubs: []
})

module.exports = mongoose.model("User", userSchema);