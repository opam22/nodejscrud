exports.add = function (req, res) {

	res.render('add_student', {tagline: "Insert your new student"});

};

exports.store = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var inputFile = JSON.parse(JSON.stringify(req.file));

	req.getConnection(function (err, connection) {

		var data = {
			name: input.name,
			age: input.age,
			hobby: input.hobby,
			photo: inputFile.filename
		};

		var query = connection.query("INSERT INTO students SET ? ", data, function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/');

		});

	});

};

exports.edit = function (req, res) {

	var id = req.params.id;

	req.getConnection(function (err, connection) {

		var query = connection.query("SELECT * FROM students WHERE id = ? ", [id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.render('edit_student', {tagline: "Edit your student", student: rows});

		});

	});

};

exports.update = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var id = req.params.id;

	req.getConnection(function (err, connection) {

		var data = {
			name: input.name,
			age: input.age,
			hobby: input.hobby
		};

		var query = connection.query("UPDATE students SET ? WHERE id = ? ", [data, id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/')

		});

	});

};

exports.destroy = function (req, res) {

	var id = req.params.id;

	req.getConnection(function (err, connection) {

		connection.query("DELETE FROM students WHERE id = ? ", [id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/');

		});

	});

};