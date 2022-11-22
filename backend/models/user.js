const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
	_id: String,
	username: String,
	email: String,
	creationTime: String,
	clubs: [{type: Schema.Types.ObjectId, ref: 'Club'}],
	profile: String,
	isAdmin: Boolean
});

userSchema.virtual('id').get(function(){
    return this._id;
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model("User", userSchema);