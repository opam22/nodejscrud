//controllers
var IndexController = require('../controllers/IndexController');
var StudentController = require('../controllers/StudentController');
var RegisterController = require('../controllers/RegisterController');
var LoginController = require('../controllers/LoginController');


module.exports = function (app, upload, passport) {

	//your application routes
	app.get('/', isLoggedIn, isAdmin,IndexController.index);
	app.get('/add', isLoggedIn, isAdmin, StudentController.add);
	app.post('/store/student', isLoggedIn, isAdmin, upload.single('photo'), StudentController.store);
	app.get('/delete/student/:id', isLoggedIn, isAdmin, StudentController.destroy);
	app.get('/edit/student/:id', isLoggedIn, isAdmin, StudentController.edit);
	app.post('/update/student/:id', isLoggedIn, isAdmin, StudentController.update);
	app.get('/edit/photo/:id', isLoggedIn, isAdmin, StudentController.editPhoto);
	app.post('/update/photo/:id', isLoggedIn, isAdmin, upload.single('photo'), StudentController.updatePhoto);


	//application routes for authentication
	app.get('/login', isGuest, LoginController.index);
	app.post('/login/do', isGuest, passport.authenticate('local-login', {
            successRedirect : '/', // redirect to the secure INDEX section
            failureRedirect : '/login', // redirect back to the login page if there is an error
            failureFlash : true // allow flash messages
		}),
        function(req, res) {

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/login');
    });


	app.get('/register', isGuest, RegisterController.index);
	app.post('/register/do', isGuest, passport.authenticate('local-register', {
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

// route middleware to make sure
function isGuest(req, res, next) {

	// if user is not authenticated in the session, carry on
	if (req.isUnauthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

function isAdmin (req, res, next) {
	if (req.user.level == 1)
		return next();


	req.logout();
	res.render('error/permission', {message: 'You dont have any permission'});

}
