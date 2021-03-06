var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');

const mongoose =require('mongoose');
const dishes = require('./models/dishes')
const promo = require('./models/promoSchema')

const url = config.mongoUrl; 

const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log("connected seucessfully");
},(err)=>{console.log(err);});

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishrouter = require('./routes/dishrouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var app = express();

app.use(passport.initialize());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// cookie parser with secret key
//app.use(cookieParser('12345-67890-09876-54321'));


// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new FileStore()
// }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// basic authentication 
// function auth (req, res, next) {
//   console.log(req.session);

// if(!req.session.user) {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     return next(err);
// }
// else {
//   if (req.session.user === 'authenticated') {
//     next();
//   }
//   else {
//     var err = new Error('You are not authenticated!');
//     err.status = 403;
//     return next(err);
//   }
// }
// }
//passport authentication


// ends here basic authentication


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishrouter);
app.use('/promo', promoRouter);
app.use('/leader', leaderRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
