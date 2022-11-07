const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	date: String,
	time: String,
	advisor: String,
	uid: String,
	approved: Boolean,
	infoPage: String
});

// https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
clubSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
clubSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model("Club", clubSchema);