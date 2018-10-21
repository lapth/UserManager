var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appConfig = require('./config/app-config');

var app = express();
var mongoose = require('mongoose');
mongoose.connect(appConfig.getMongoURL());
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB Connected!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * ================== Setup cross site access ==================
 */
app.use('/*', function (req, res, next) {
  var allowedOrigins = appConfig.getAllowedSites();
  var origin = req.headers.origin;
  console.debug("Invoking from: " + origin);
  if (allowedOrigins.indexOf(origin) > -1) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  // res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/**
 * ================== Setup routers ============================
 */
app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * ================== Setup error handling =====================
 */
app.use(function(req, res, next) {
  next(createError(404));
});

/**
 * ================== Setup JWT ================================
 */

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
