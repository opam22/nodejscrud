var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var multer  = require('multer')

var app = express();

//port configuration
var port = process.env.PORT || 8080;


//multer configuration
//destination path
//n
//rename file
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
});
var upload = multer({ storage: storage })


//database setup
var connection = require('express-myconnection');
var mysql = require('mysql');
app.use(

	connection(mysql, {
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'nodejscrud'
	}, 'pool')

);

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//logger and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//static path
app.use(express.static(path.join(__dirname, 'public')));



// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// routes ======================================================================
require('./config/routes.js')(app, upload); // load our routes 

/*//controllers
var IndexController = require('./controllers/IndexController');
var StudentController = require('./controllers/StudentController');

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
});*/



//create HTTP server
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);