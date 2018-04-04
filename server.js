
//declare var
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var bcrypt = require('bcryptjs');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;

//declare var routes
var index = require('./routes/index');

//api
var userapi = require('./routes/user-api');
var activity_api = require('./routes/activity-api');
var follow_users_api = require('./routes/follow-users-api');

//const
var appConst = require('./const/app-const');

// app
var app = express();

//declare MongoDb connection
var mongoDBUrl = appConst.DB_CONNECTION;
var mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect(mongoDBUrl, { useMongoClient: true })
    .then(() => console.log(appConst.DB_CONNECT_SUCCESS))
    .catch((err) => console.error(err));

// cors
app.use(cors());

// views
//app.set('views', path.join(__dirname, 'src'));

// engine
app.set('view enginer', appConst.VIEW_FILE_EXTENSION);
app.engine('html', require(appConst.VIEW_FILE_EXTENSION).renderFile);

// angular 2 dist
app.use(express.static(__dirname + appConst.ANGULAR_DIR));

// view engine setup - ejs views
app.set('views', path.join(__dirname, appConst.VIEW));
app.set('view engine', appConst.VIEW_FILE_EXTENSION);

// ejs public
app.use(express.static(path.join(__dirname, appConst.RESOURCE)));

//express-validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(logger(appConst.LOGGER));

app.use(cookieParser());
app.use(session({ secret: appConst.SERCRET, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash(appConst.SUCCESS_MES);
    res.locals.err_msg = req.flash(appConst.ERROR_MES);
    res.locals.error = req.flash('error');
    next();
})

// body bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route 
app.use('/', index);
app.use(appConst.USER_API, userapi);
app.use(appConst.ACTIVITY_API, activity_api);
app.use(appConst.FOLLOW_USER_API, follow_users_api);

if(appConst.DB_SYSTEM == 'mongodb only') {
    var roomapi = require('./routes/room-api');
    var hotel_service_api = require('./routes/hotel-service-api');
    app.use(appConst.ROOM_API, roomapi);                  // old version mongodb 
    app.use(appConst.RESTAURANT_API, hotel_service_api);  // old version mongodb 
}


// Initialize the app.
var server = app.listen(process.env.PORT || appConst.PORT, function () {
    var port = server.address().port;
    process.setMaxListeners(0);
    console.log(appConst.APP_RUNNING_RESULT, port);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error(appConst.PAGE404);
    err.status = 404;
    res.redirect('/');
    //next(err);
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