/*
used to handle index request
get data from students table
response render to index.ejs
 */
module.exports.index = function (req, res) {

	req.getConnection(function (err, connection) {

		var query = connection.query('SELECT * FROM students', function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('index', {tagline: "Index page", students: rows, userAuth: req.user});

		});

	});

};
