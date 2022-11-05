const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	id: String,
	clubs: {}
})

module.exports = mongoose.model("User", userSchema);