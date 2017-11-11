
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
var roomapi = require('./routes/room-api');
var hotel_service_api = require('./routes/hotel-service-api');
var activity_api = require('./routes/activity-api');
var follow_users_api = require('./routes/follow-users-api');
var suggest_room_api = require('./routes/suggest-room-api');

// app
var app = express();

//declare MongoDb connection
var mongoDBUrl = "mongodb://localhost:27017/HotelBookingReservationsSystem";
var mongoose = require('mongoose');

// connect to MongoDB
mongoose.connect(mongoDBUrl, { useMongoClient: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

// cors
app.use(cors());

// views
//app.set('views', path.join(__dirname, 'src'));

// engine
app.set('view enginer', 'ejs');
app.engine('html', require('ejs').renderFile);

// angular 2 dist
app.use(express.static(__dirname + '/dist'));

// view engine setup - ejs views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ejs public
app.use(express.static(path.join(__dirname, 'public')));

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


app.use(logger('dev'));


app.use(cookieParser());
app.use(session({ secret: 'dohungcuong', resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.err_msg = req.flash('err_msg');
    res.locals.error = req.flash('error');
    next();
})




// body bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// route 
app.use('/', index);
app.use('/api/rooms', roomapi);
app.use('/api/hotel-services', hotel_service_api);
app.use('/api/users', userapi);
app.use('/api/activity', activity_api);
app.use('/api/follow-users', follow_users_api);
app.use('/api/suggest-room', suggest_room_api);


// Initialize the app.
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
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