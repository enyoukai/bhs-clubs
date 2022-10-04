const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
	name: String,
	description: String
})

module.exports = mongoose.model("Club", clubSchema);