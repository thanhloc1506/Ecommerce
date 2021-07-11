const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	typeUser: {
		type: Number,
		required: true,
		enum: [0, 1], //0: admin, 1:customer
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
