//controllers
var IndexController = require('../controllers/IndexController');
var StudentController = require('../controllers/StudentController');


module.exports = function (app, upload) {

	//your application routes
	app.get('/', IndexController.index);
	app.get('/add', StudentController.add);
	app.post('/store/student', upload.single('photo'), StudentController.store);

	app.get('/delete/student/:id', StudentController.destroy);
	app.get('/edit/student/:id', StudentController.edit);
	app.post('/update/student/:id', StudentController.update);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

}
