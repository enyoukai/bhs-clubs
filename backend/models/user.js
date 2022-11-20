const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
	_id: String,
	username: String,
	email: String,
	creationTime: String,
	clubs: [{type: Schema.Types.ObjectId, ref: 'Club'}],
	profile: String
})

module.exports = mongoose.model("User", userSchema);