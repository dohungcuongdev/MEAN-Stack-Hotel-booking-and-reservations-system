var express = require('express');
var router = express.Router();
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var UserModel = require('../models/user-model.js');
var ctrl = require('../controller/app-controller');

//const
var appConst = require('../const/app-const');

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
                return done(null, false, { message: appConst.INVALID_USERNAME });
            }

            UserModel.comparePwd(password, username.password, function (error, isMatch) {
                if (error)
                    throw error;
                if (isMatch) {
                    return done(null, username);
                } else {
                    return done(null, false, { message: appConst.WRONG_PW });
                }
            });
        });
    }
));

passport.serializeUser(ctrl.serializeUser);
passport.deserializeUser(ctrl.deserializeUser);

router.get('/logout', ctrl.logout);
router.get('/login', ctrl.login);
router.post('/login', passport.authenticate('local', { successRedirect: '/loginsuccess', failureRedirect: '/login', failureFlash: true }));
router.get('/loginsuccess', ctrl.loginsuccess);
router.get('/register', ctrl.register);
router.post('/register', ctrl.checkregister);

module.exports = router;