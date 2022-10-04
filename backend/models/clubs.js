const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	day: String,
	time: String,
	advisor: String,
	id: String
})

module.exports = mongoose.model("Club", clubSchema);