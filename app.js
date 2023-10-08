/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-09-27 15:28:24
 * @LastEditors: Gaiwa 13012265332@163.com
 * @LastEditTime: 2023-10-08 20:03:06
 * @FilePath: \express\myBlog\app.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const getPubKeyRouter = require('./routes/getPubKey')
const loginRouter = require('./routes/login')

const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  "origin": true,     // true为req.origin
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,     // next() 是否传递options请求
  "optionsSuccessStatus": 204,
  "credentials": true,          // 开启cookie跨域
  "maxAge": 172800,
}))


app.use('/user', indexRouter);
app.use('/getPublicKey', getPubKeyRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);



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
