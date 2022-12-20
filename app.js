var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

require('dotenv').config();

const username = process.env.USERNAME_DB
const password = process.env.PASSWORD_DB

// mongoose.connect(`mongodb+srv://${username}:${password}@shopping-app.iq7wpyk.mongodb.net/?retryWrites=true&w=majority`,(err) => {
//   console.log('Connected to Database!')
// })

mongoose.connect(`mongodb://${username}:${password}@ac-fekkei6-shard-00-00.iq7wpyk.mongodb.net:27017,ac-fekkei6-shard-00-01.iq7wpyk.mongodb.net:27017,ac-fekkei6-shard-00-02.iq7wpyk.mongodb.net:27017/?ssl=true&replicaSet=atlas-zt6tv6-shard-0&authSource=admin&retryWrites=true&w=majority`,(err) => {
  console.log(err ? err : 'Connected to Database!')
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//tkMoKnbsB7ipGKtJ