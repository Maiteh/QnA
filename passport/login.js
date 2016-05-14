/**
* Here we will now define Passport's strategies 
* for handling login and signup. 
*/
var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){
    
  /**
  * The first parameter is the name of the strategy which will be used to 
  * identify this strategy when applied later
  * The second parameter is the type of strategy that you want to create, 
  * here we use the username-password or the LocalStrategy
  */
  passport.use('login', new LocalStrategy({
    // passReqToCallback allows to access the request object in the callback, 
    passReqToCallback : true
    },
    function(req, username, password, done) { 
      // check in mongo if a user with username exists or not
      User.findOne({ 'username' :  username }, 
        function(err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log error & redirect back
          if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false, 
                req.flash('message', 'User Not found.'));                 
          }
          // User exists but wrong password, log the error 
          if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false, 
                req.flash('message', 'Invalid Password'));
          }
          // User and password both match, return user from 
          // done method which will be treated like success
          return done(null, user);
        }
      );
    })
  );
  var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  }
}