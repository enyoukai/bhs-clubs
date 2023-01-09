const mongoose = require("mongoose");

const User = require('./users');

const clubSchema = new mongoose.Schema({
	name: String,
	description: String,
	location: String,
	time: String,
	advisor: String,
	approved: Boolean,
	infoFormat: [],
	verification: String,
	createdAt: {type: Date, default: Date.now},
	dates: [{type: Number}],
	officers: [{type: String, ref: User}],
	members: [{type: String, ref: User}],
	tags: {},
	lastPosted: Date,
	meetingTimes: [{
		date: Number,
		timeHour: Number,
		timeMinute: Number
	}]
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