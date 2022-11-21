const mongoose = require("mongoose");
const {Schema} = mongoose;

const postSchema = new mongoose.Schema({
	title: String,
	author: {type: String, ref: 'User'},
	body: String,
	time: String,
	file: String,
	club: {type: Schema.Types.ObjectId, ref: 'Club'}
})

postSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
postSchema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model("Post", postSchema);