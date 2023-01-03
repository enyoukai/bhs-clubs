const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
	club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
	author: { type: String, ref: 'User' },
	verificationURL: String
});

// https://stackoverflow.com/questions/7034848/mongodb-output-id-instead-of-id
claimSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

// Ensure virtual fields are serialised.
claimSchema.set('toJSON', {
	virtuals: true
});

module.exports = mongoose.model("Claim", claimSchema);