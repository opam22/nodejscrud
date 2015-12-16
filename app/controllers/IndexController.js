module.exports.index = function (req, res) {

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT * FROM students', function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('index', {tagline: "Index page", students: rows});

		});

	});

};
