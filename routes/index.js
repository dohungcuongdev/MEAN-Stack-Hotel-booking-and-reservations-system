var express = require('express');
var router = express.Router();
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/user-model.js');
var ActivityModel = require('../models/activity-model');
var FolowUsersModel = require('../models/follow-users-model');
var cookie = require('cookie');
var externalip = require('externalip');
var geoip = require('geoip-lite');

passport.use(new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, done) {
        UserModel.GetUserByUsername(username, function (error, username) {
            if (error)
                throw error;
            if (!username) {
                followUsers('login failed: Invalid username', req, res);
                return done(null, false, { message: "Invalid Username" });
            }

            UserModel.comparePwd(password, username.password, function (error, isMatch) {
                if (error)
                    throw error;
                if (isMatch) {
                    return done(null, username);
                } else {
                    followUsers('login failed: wrong username or password', req, res);
                    return done(null, false, { message: "Wrond password!!" });
                }
            });
        });
    }
));



passport.serializeUser(function (username, done) {
    done(null, username.id);
});

passport.deserializeUser(function (id, done) {
    UserModel.GetUserByID(id, function (error, username) {
        done(error, username);
    });
});

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

function followUsers(page_access, req, res) {

    var duration = 0;
    if (req.cookies['start_access'] == null) {
        res.cookie('start_access', Date.now() + "");
        duration = 0;
    } else {
        duration = Date.now() - +req.cookies['start_access'];
        res.cookie('start_access', Date.now() + "");
    }

    var ip_address = '';
    var os = require('os');
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                //console.log(ifname + ':' + alias, iface.address);
                ip_address = iface.address;
            } else {
                // this interface has only one ipv4 adress
                //console.log(ifname, iface.address);
                ip_address = iface.address;
            }
            ++alias;
        });
    });

    externalip(function (err, external_ip) {
        if (err) {

        } else {
            var geo = geoip.lookup(external_ip);

            var newFolowUsersModel = new FolowUsersModel(
                {
                    user_ip_address: ip_address,
                    external_ip_address: external_ip,
                    page_access: page_access,
                    duration: duration,
                    country: geo.country,
                    city: geo.city
                });
            FolowUsersModel.add(newFolowUsersModel);
        }
    });
}

router.get('/logout', function (req, res) {
    followUsers('click page /logout', req, res);
    res.clearCookie("id");
    req.logout();
    res.redirect('/');
});

router.get('/login', function (req, res, next) {
    followUsers('click page /login', req, res);
    res.render("login", { errors: null, title: 'Login' });
});

router.post('/login',
    passport.authenticate(
        'local',
        {
            successRedirect: '/loginsuccess',
            failureRedirect: '/login',
            failureFlash: true
        })
);


router.get('/loginsuccess', checkAuthentication, function (req, res, next) {
    followUsers('login success: ' + req.user.username, req, res);
    var id = req.user._id + "";
    res.cookie('id', id, { maxAge: 60 * 60 * 24 * 7 * 1000 }); // 1 week
    res.redirect('/');
});


router.get('/register', function (req, res, next) {
    followUsers('click page /register', req, res);
    res.render("register", { errors: null, success: false, title: 'Sign Up' });
});


router.post('/register', function (req, res, next) {
    //use express-validator
    req.checkBody('username', 'Please input your username').notEmpty();
    req.checkBody('password', 'Please input your password').notEmpty();
    req.checkBody('password_confirmation', 'Confirm must be the same with password').equals(req.body.password);
    req.checkBody('name', 'Please input your full name').notEmpty();
    req.checkBody('phone', 'Please input your phone number').notEmpty();
    req.checkBody('phone', 'Phone number must be digits only').isInt();
    req.checkBody('address', 'Please input your address').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        followUsers('sign up failed: validation form not accepted', req, res);
        res.render("register", { errors: errors, success: false, title: "Sign Up" });
    } else {
        var username = req.body.username;
        UserModel.GetUserByUsername(username, function (error, username) {
            if (error) {
                followUsers('sign up failed: cannot check users', req, res);
                console.log(error);
            }
            if (username) {
                errors = [{
                    param: 'username',
                    msg: 'This username is already taken',
                    value: ''
                }];
                followUsers('sign up failed: exist account: ' + username, req, res);
                res.render("register", { errors: errors, success: false, title: "Sign Up" });
            } else {
                var newUser = new UserModel(
                    {
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name,
                        phone: req.body.phone,
                        address: req.body.address,
                        balance: 500
                    });
                UserModel.addUser(newUser);

                var newActivity = new ActivityModel(
                    {
                        username: req.body.username,
                        name: 'Sign up',
                        fullname: req.body.name,
                        email: req.body.username,
                        phone: req.body.phone,
                        click: 'register',
                        details: 'You have signed up with email ' + req.body.username,
                        note: 'You are having $500 in your account',
                        content: 'Thank you for join us! You are able to use premium feature!',
                        response: "Not Yet"
                    });
                ActivityModel.addActivity(newActivity);
                followUsers('sign up successfully: ' + username, req, res);
                res.render("register", { errors: false, success: true, title: "Sign Up" });
            }
        })
    }

});

module.exports = router;
