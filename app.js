var express = require('express');
var session  = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var multer  = require('multer')
var connection = require('express-myconnection');
var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');

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

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//logger and body parser
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//static path
app.use(express.static(path.join(__dirname, 'public')));

//database setup
require('./config/database.js')(app, connection, mysql); // load our database setup and pass our app, connection and mysql


require('./config/passport')(passport); // pass passport for configuration
// required for passport
app.use(session({
  secret: 'vidyapathaisalwaysrunning',
  resave: true,
  saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes setup
require('./app/http/routes.js')(app, upload, passport); //load our routes setup and pass our app and upload


// error handlers
// development error handler
// will print stacktrace
// export NODE_ENV=development for development
// export NODE_ENV=production for production
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: {}
  });
});

//create HTTP server
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
console.log(app.get('env'));