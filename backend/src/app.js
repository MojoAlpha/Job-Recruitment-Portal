require('dotenv').config();
require('./config/nodeMailer')
require('./config/db')

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors')
var cookieParser = require('cookie-parser')

var authRouter = require('./router/authRouter/index')
var userRouter = require('./router/userRouter/index');
var companyRouter = require('./router/companyRouter/index')
var vacancyRouter = require('./router/vacancyRouter/index')
var postsRouter = require('./router/postRouter/index')

var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// Middlewares Setup
app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

// Main Routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/company', companyRouter);
app.use('/vacancy', vacancyRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return res.status(404).json({err: req.method + " method not found!!"})
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err: err.message, success: false});
});

module.exports = app;