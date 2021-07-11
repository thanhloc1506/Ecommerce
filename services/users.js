const User = require('../models/User');
const argon2 = require('argon2');

const createUser = async (userName, password, typeUser = 1) => {
	const hash = await argon2.hash(password);
	return await User.create({ username: userName, password: hash, typeUser: typeUser });
};

const findById = async (id) => {
	return await User.findById(id).select('-password');
};

const findUserByUserName = async (username) => {
	return await User.findOne({ username: username }, (err, username) => {
		// console.log(username);
	}).select('-password');
};

const verifyPassword = async (hash, password) => {
	return await argon2.verify(hash, password);
};

module.exports = { createUser, findUserByUserName, findById, verifyPassword };
