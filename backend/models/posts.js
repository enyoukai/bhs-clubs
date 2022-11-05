const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: String,
	author: String,
	body: String,
	time: String,
	id: String,
})

module.exports = mongoose.model("Post", postSchema);