const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
	_id: String,
	username: String,
	email: String,
	creationTime: {type: Date, default: Date.now},
	clubs: [{type: Schema.Types.ObjectId, ref: 'Club'}],
	profile: String,
	isAdmin: Boolean,
	unreadPosts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

userSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model("User", userSchema);