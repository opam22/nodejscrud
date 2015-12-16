/*
used to handle index to register page request
response render to register.ejs
 */
module.exports.index = function (req, res) {

	res.render('register', {tagline: "Register page", message: req.flash('registerMessage') });

};
