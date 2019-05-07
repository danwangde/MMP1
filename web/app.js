var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var multiparty = require('connect-multiparty');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(logger('dev'));
//app.use(multiparty({uploadDir:'./upload/' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('/root/isofile'));


app.use('/bridgeInfo',require('./routes/bridgeInfo'));
app.use('/bridgedataquery',require('./routes/bridgedataquery'));
app.use('/maintain/task',require('./routes/maintain/task.js'));
app.use('/maintain/patrol',require('./routes/maintain/patrol.js'));
app.use('/maintain/order',require('./routes/maintain/order.js'));
app.use('/maintain/scheme',require('./routes/maintain/scheme.js'));
app.use('/maintain/check',require('./routes/maintain/check.js'));
app.use('/maintain/cost',require('./routes/maintain/cost.js'));
app.use('/price',require('./routes/price'));
app.use('/disease',require('./routes/disease.js'));
app.use('/ceshi',require('./routes/ceshi.js'));
app.use('/bridge/bridgeinfo',require('./routes/bridge/bridgeinfo.js'));
app.use('/bridge/line',require('./routes/bridge/line.js'));
app.use('/bridge/span',require('./routes/bridge/span.js'));
app.use('/bridge/surface',require('./routes/bridge/surface.js'));
app.use('/bridge/history',require('./routes/bridge/history.js'));
app.use('/passageway/passagewayinfo',require('./routes/passageway/passagewayinfo.js'));
app.use('/passageway/entrance',require('./routes/passageway/entrance.js'));
app.use('/passageway/surface',require('./routes/passageway/surface.js'));



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
