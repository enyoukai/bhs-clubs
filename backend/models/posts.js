const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: String,
	author: String,
	body: String,
	time: String,
	club: {},
})

postSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model("Post", postSchema);