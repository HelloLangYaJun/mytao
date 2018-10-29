var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var config = require('./config');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
app.use(session({
    name:'Lang',
    secret: 'Langyajun',
    resave: false, //是否重新保存session
    saveUninitialized: false,  //保存初始化
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7,secure:false}, // 7天
    store: new MongoStore({
        url: 'mongodb://localhost/' + config.db,
        collection: 'sessions'
    })
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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
app.listen(3000)
module.exports = app;
