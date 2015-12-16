/*
used to handle index to login page request
response render to login.ejs
 */
module.exports.index = function (req, res) {

	res.render('login', {tagline: "Login page", message: req.flash('loginMessage') });

};
