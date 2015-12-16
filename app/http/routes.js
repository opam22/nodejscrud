//controllers
var IndexController = require('../controllers/IndexController');
var StudentController = require('../controllers/StudentController');
var RegisterController = require('../controllers/RegisterController');
var LoginController = require('../controllers/LoginController');


module.exports = function (app, upload, passport) {

	//your application routes
	app.get('/', isLoggedIn, IndexController.index);
	app.get('/add', StudentController.add);
	app.post('/store/student', upload.single('photo'), StudentController.store);
	app.get('/delete/student/:id', StudentController.destroy);
	app.get('/edit/student/:id', StudentController.edit);
	app.post('/update/student/:id', StudentController.update);


	//application routes for authentication
	app.get('/login', LoginController.index);
	app.post('/login/do', passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure INDEX section
            failureRedirect : '/login', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/login');
    });
	app.get('/register', RegisterController.index);
	app.post('/register/do', passport.authenticate('local-register', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/register', // redirect back to the signup page if there is an error
		failureFlash: true
	}));
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});


	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/login');
}
