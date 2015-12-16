module.exports.index = function (req, res) {

	res.render('login', {tagline: "Login page", message: req.flash('loginMessage') });

};
