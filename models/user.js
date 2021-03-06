/**
* Creating a user model in mongoose
* Basically, we are creating a Mongoose model using which we can perform CRUD * operations on the underlying database.
*/
var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');
// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type:  String,
		index: true
	},
	password: {
		type:  String
	},
	email: {
		type:  String
	},
});

var User = module.exports = mongoose.model('User', UserSchema);
/**
* Hashing password and checking 
*/
module.exports.createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
	    bcrypt.hash(newUser.password, salt, function (err, hash) {
	        newUser.password = hash;
            newUser.username = newUser.username.toLowerCase();
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function (username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
};

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
};