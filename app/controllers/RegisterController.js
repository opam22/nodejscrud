module.exports.index = function (req, res) {

	res.render('register', {tagline: "Register page", message: req.flash('registerMessage') });

};
