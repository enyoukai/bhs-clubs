const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	date: String,
	time: String,
	advisor: String,
	id: String,
	uid: String
})

module.exports = mongoose.model("Club", clubSchema);