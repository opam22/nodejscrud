/*
used to handle add request to student page
response render to add_student.ejs
 */
module.exports.add = function (req, res) {

	res.render('add_student', {tagline: "Insert your new student"});

};



/*
used to handle store request
post data name, age, hobby, photo
response render redirect to / (index)
 */
module.exports.store = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));

	if (req.file != undefined) {
		var inputFile = JSON.parse(JSON.stringify(req.file));
	} else {
		var inputFile = { filename: 'default.jpg' };
	}

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



/*
used to handle edit request to edit student page
get data from students table
response render to edit_student.ejs
 */
module.exports.edit = function (req, res) {

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



/*
used to handle update request
get id
post name, age, hobby
response render redirect to / (index)
 */
module.exports.update = function (req, res) {

	var input = JSON.parse(JSON.stringify(req.body));
	var user_id = req.params.id;

	req.getConnection(function (err, connection) {

		var data = {
			name: input.name,
			age: input.age,
			hobby: input.hobby
		};

		var query = connection.query("UPDATE students SET ? WHERE id = ? ", [data, user_id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/')

		});

	});

};


/*
used to handle edit request to edit
get data from students table
response render to edit_student.ejs
 */
module.exports.editPhoto = function (req, res) {

	var id = req.params.id;

	res.render('edit_photo', {tagline: "Edit photo", user_id: id});

}


/*
used to handle update photo
 */
module.exports.updatePhoto = function(req, res) {

	var user_id = req.params.id;

	if (req.file != undefined) {
		var inputFile = JSON.parse(JSON.stringify(req.file));
	} else {
		var inputFile = { filename: 'default.jpg' };
	}

	req.getConnection(function (err, connection) {

		var data = {
			photo: inputFile.filename
		};

		var query = connection.query("UPDATE students SET ? WHERE id = ? ", [data, user_id], function (err, rows) {

			if (err) {
				console.log("Error : %s ", err);
			}
			res.redirect('/');

		});

	});

}

/*
used to handle destroy request
get id
response render redirect to / (index)
 */
module.exports.destroy = function (req, res) {

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
