const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
	_id: String,
	username: String,
	clubs: [{type: Schema.Types.ObjectId, ref: 'Club'}]
})

module.exports = mongoose.model("User", userSchema);