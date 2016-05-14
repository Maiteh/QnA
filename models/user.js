/**
* Creating a user model in mongoose
* Basically, we are creating a Mongoose model using which we can perform CRUD * operations on the underlying database.
*/
var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String
});