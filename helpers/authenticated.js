var ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    console.log('req.user', req.user);
    console.log('req.session', req.session);
    if (req.isAuthenticated()) {
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
};
module.exports = ensureAuthenticated;
