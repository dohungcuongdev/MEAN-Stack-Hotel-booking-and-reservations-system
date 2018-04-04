var activityModel = require('../models/activity-model');
var userModel = require('../models/user-model.js');
var followUserModel = require('../models/follow-users-model');
var ipSuggestModel = require('../models/ip-suggest-model');

const getIP = require('external-ip')();
// var geoip = require('geoip-lite');
var externalip = require('externalip');
var cookie = require('cookie');

//const
var appConst = require('../const/app-const');

var httpRequest = require("request");

//mail
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({ service: appConst.MAIL_SERVICE, tls: { rejectUnauthorized: false }, auth: { user: appConst.MAIL_USER, pass: appConst.MAIL_AUTH } });

function sendHTMLEmail(from, to, subject, content) {
    transporter.sendMail({ from: from, to: to, subject: subject, html: content });
}

function getApi(response, err, resource) {
    if (err) {
        response.send(err).status(404);
    } else {
        response.send(resource).status(200);
    }
}

function postApi(response, err, resource) {
    if (err) {
        response.send(err).status(501);
    } else {
        response.json(resource).status(201);
    }
}

function deleteApi(response, err, resource) {
    if (err) {
        return response.send(err);
    } else {
        response.send(resource);
    }
}

exports.getActivityByUserName = function (request, response) {
    activityModel.findActivityByUserName(request.params.username, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getNotResponseActivity = function (request, response) {
    activityModel.findNotResponseActivity({}, function (err, res) {
        getApi(response, err, res);
    });
};

function getActivityByID(request, response) {
    activityModel.findById(request.params.id, function (err, res) {
        getApi(response, err, res);
    });
}

exports.getActivityByID = function (request, response) {
    getActivityByID(request, response);
};

exports.seenAndGetNotification = function (request, response) {
    activityModel.updateResponse(request.params.id, "Seen");
    getActivityByID(request, response);
};

exports.replyAndGetNotification = function (request, response) {
    activityModel.updateResponse(request.params.id, "Email sent");
    getActivityByID(request, response);
};

exports.getActivityFeedBackRoom = function (request, response) {
    activityModel.findFeedbackRoom(request.params.id, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getActivityFeedBackHotel = function (request, response) {
    activityModel.findFeedbackHotel(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getActivity = function (request, response) {
    activityModel.findAll(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getFollowUserByUserIP = function (request, response) {
    followUserModel.findByUserIP(request.params.userIP, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getFollowUserByPage = function (request, response) {
    followUserModel.findFollowUserByPage(request.params.page, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getNumPageTracking = function (request, response) {
    followUserModel.countClickTracking(function (err, totalTracking) {
        var numPage = { "total_page": Math.round(totalTracking / appConst.NUM_TRACKING_EACH_PAGE) };
        getApi(response, err, numPage);
    });
};

exports.getSortedTrackingData = function (request, response) {
    followUserModel.findSortedTrackingData(request.params.field_name, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getSortedTrackingData2 = function (request, response) {
    followUserModel.findSortedTrackingData2(request.params.fieldname, request.params.sort, request.params.page, function (err, res) {
        getApi(response, err, res);
    });
};

exports.searchTrackingData = function (request, response) {
    followUserModel.searchTrackingData(request.params.fieldname, request.params.keyword, request.params.sort, request.params.page, function (err, res) {
        getApi(response, err, res);
    });
};

exports.searchTotalPage = function (request, response) {
    followUserModel.countSearchPage(request.params.fieldname, request.params.keyword, function (err, totalTracking) {
        var numPage = { "total_page": Math.round(totalTracking / appConst.NUM_TRACKING_EACH_PAGE) };
        getApi(response, err, numPage);
    });
};

exports.getExternalIP = function (request, response) {
    followUserModel.findExternalIP(request.params.externalIP, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getExternalIPStatistics = function (request, response) {
    followUserModel.findExternalIPStatistics(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getIPStatistics = function (request, response) {
    followUserModel.findIPStatistics(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getUsernameStatistics = function (request, response) {
    followUserModel.findUsernameStatistics(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getPageAccessStatistics = function (request, response) {
    followUserModel.findPageAccessStatistics(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getPageAccessByIP = function (request, response) {
    followUserModel.findPageAccessByIP(request.params.userIP, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getPageAccessByUsername = function (request, response) {
    followUserModel.findPageAccessByUsername(request.params.username, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getCountryChartData = function (request, response) {
    followUserModel.findCountryChartData(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getFollowUserByID = function (request, response) {
    followUserModel.findById(request.params.id, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getFollowUser = function (request, response) {
    followUserModel.findAll(function (err, res) {
        getApi(response, err, res);
    });
};

exports.getUser = function (request, response) {
    userModel.find({}, function (err, res) {
        getApi(response, err, res);
    });
};

exports.getUserByID = function (request, response) {
    userModel.GetUserByID(request.params.id, function (err, res) {
        getApi(response, err, res);
    });
};

exports.GetUserByUsername = function (request, response) {
    userModel.GetUserByUsername(request.params.username, function (err, res) {
        getApi(response, err, res);
    });
};

exports.postActivity = function (request, response) {
    var activity = new activityModel(request.body);
    if (!activityIsAbleToUpdate(activity)) {
        response.send(appConst.ERROR_MES).status(501);
    } else {
        var usernameAuth = request.cookies.username;
        if (usernameAuth != null) activity.username = usernameAuth;
        sendHTMLEmail(appConst.MAIL_USER, activity.username, activity.name, getMailContent(activity.name, activity.created_at));
        activity.save(function (err, resource) {
            postApi(response, err, resource);
        });
    }
};

function getMailContent(subject, time) {
    switch (subject) {
        case 'Sign up': return appConst.HEADER_MAIL + 'You have created a new account at ' + time + appConst.FOOTER_MAIL; break;
        case 'Change password': return appConst.HEADER_MAIL + 'You have changed your password at ' + time + appConst.FOOTER_MAIL; break;
        case 'Book Room': return appConst.HEADER_MAIL + 'You have booked a room at ' + time + appConst.FOOTER_MAIL; break;
        case 'Cancel Room': return appConst.HEADER_MAIL + 'You have canceled a room at ' + time + appConst.FOOTER_MAIL; break;
        case 'Feedback Room': return appConst.HEADER_MAIL + 'You have send feedback for a room at ' + time + appConst.FOOTER_MAIL; break;
        case 'Feedback': return appConst.HEADER_MAIL + 'You have send feedback at ' + time + appConst.FOOTER_MAIL; break;
        case 'Send Contact': return appConst.HEADER_MAIL + 'You have send a contact message to us at ' + time + appConst.FOOTER_MAIL; break;
        case 'Reservation': return appConst.HEADER_MAIL + 'You have send a reservation request at ' + time + appConst.FOOTER_MAIL; break;
    }
}

exports.postFollowUser = function (request, response) {
    var ip_address = getIpAddress(request);
    if (appConst.RUN_ON_SERVER == 'online') {
        //saveFollowUserData(request, response, appConst.LIST_IP_ADDRESS_TEST[1], appConst.LIST_IP_ADDRESS_TEST[1]);
        saveFollowUserData(request, response, ip_address, ip_address);
    }
    if (appConst.RUN_ON_SERVER == 'localhost') {
        getIP((err, external_ip) => {
            if (err) {
                console.log(err);
                //saveFollowUserData(request, response, appConst.DEFAULT_IP);
            } else {
                saveFollowUserData(request, response, ip_address, external_ip);
            }
        });
    }
};

exports.putUser = function (req, response, next) {
    userModel.findByIdAndUpdate(req.params.id, req.body, function (err, res) {
        if (err) return next(err);
        else {
            response.json(res);
        }
    });
};

exports.deleteActivity = function (request, response) {
    var id = request.params.id;
    activityModel.remove({ _id: id }, function (err, resource) {
        deleteApi(response, err, resource);
    });
};

exports.deleteFollowUser = function (request, response) {
    var id = request.params.id;
    followUserModel.remove({ _id: id }, function (err, resource) {
        deleteApi(response, err, resource);
    })
};

exports.serializeUser = function (username, done) {
    done(null, username.id);
};

exports.deserializeUser = function (id, done) {
    userModel.GetUserByID(id, function (error, username) {
        done(error, username);
    });
};

exports.updateUserStatus = function (request, response) {
    userModel.updateStatus(request.params.username, request.params.status);
    userModel.GetUserByUsername(request.params.username, function (err, res) {
        getApi(response, err, res);
    });
};

exports.checklogin = function (username, password, done) {
    userModel.GetUserByUsername(username, function (error, user) {
        if (error)
            throw error;
        if (!user) {
            //followUserBehavior(appConst.LOGIN_FAIL + appConst.INVALID_USERNAME, 0);
            return done(null, false, { message: appConst.INVALID_USERNAME });
        }

        if (user.status == 'Blocked') {
            //followUserBehavior(appConst.LOGIN_FAIL + appConst.USER_BLOCKED, 0);
            return done(null, false, { message: appConst.USER_BLOCKED });
        }

        userModel.comparePwd(password, user.password, function (error, isMatch) {
            if (error)
                throw error;
            if (isMatch)
                return done(null, user);
            else {
                //followUserBehavior(appConst.LOGIN_FAIL + appConst.WRONG_PW, 0);
                return done(null, false, { message: appConst.WRONG_PW });
            }
        });
    });
};

exports.logout = function (req, res) {
    followUsers(appConst.CLICK_LOGOUT, req, res);
    res.clearCookie("id");
    res.clearCookie("username");
    req.logout();
    res.redirect('/');
};

exports.login = function (req, res, next) {
    if (req.cookies.id != null)
        res.redirect('/');
    followUsers(appConst.CLICK_LOGIN, req, res);
    res.render("login", { errors: null, title: 'Login' });
};

exports.loginsuccess = function (req, res, next) {
    followUsers(appConst.LOGIN_SUCCESS + req.user.username, req, res);
    var id = req.user._id + "";
    var username = req.user.username;
    res.cookie('id', id, { maxAge: 60 * 60 * 24 * 7 * 1000 }); // 1 week
    res.cookie('username', username, { maxAge: 60 * 60 * 24 * 7 * 1000 }); // 1 week
    res.redirect('/');
};

exports.changepass = function (req, res, next) {
    if (req.cookies.id == null)
        res.redirect('/login');
    followUsers(appConst.CLICK_ChANGE_PW, req, res);
    res.render('changepass', { errors: null, success: false, title: 'Change Password' });
};

function renderChangePWError(err, res) {
    errors = [{ param: 'current_password', msg: err, value: '' }];
    followUsers(appConst.CHANGE_PW_FAIL + err, req, res);
    res.render("changepass", { errors: errors, success: false, title: subject });
}

exports.checkPassword = function (req, res, next) {
    var username = req.cookies.username;
    var current_password = req.body.current_password;
    var new_password = req.body.new_password;
    req.checkBody('current_password', appConst.INPUT_PASSWORD).notEmpty();
    req.checkBody('new_password', appConst.INVALID_PASSWORD).notEmpty().len(8, 30);
    req.checkBody('password_confirmation', appConst.CONFIRM_PW).equals(new_password);
    var errors = req.validationErrors();
    var subject = 'Change password';
    if (errors) {
        followUsers(appConst.SIGNUP_INVALID, req, res);
        res.render("changepass", { errors: errors, success: false, title: "Change Password" });
    } else {
        userModel.GetUserByUsername(username, function (error, user) {
            if (user) {
                userModel.comparePwd(current_password, user.password, function (error, isMatch) {
                    if (isMatch) {
                        userModel.comparePwd(new_password, user.password, function (error, isMatch) {
                            if (isMatch)
                                renderChangePWError(appConst.PW_NOT_CHANGE, res);
                            else {
                                userModel.updatePassword(username, new_password);
                                var newActivity = new activityModel({ username: username, name: subject, click: 'change password', details: appConst.CHANGE_PW_DETAIL, note: appConst.CHANGE_PW_NOTE, content: appConst.CHANGE_PW_CONTENT, response: appConst.NO_RES });
                                activityModel.addActivity(newActivity);
                                sendHTMLEmail(appConst.MAIL_USER, username, subject, getMailContent(subject, newActivity.created_at));
                                followUsers(appConst.CHANGE_PW_SUCCESS, req, res);
                                res.render("changepass", { errors: false, success: true, title: subject });
                            }
                        });
                    } else
                        renderChangePWError(appConst.WRONG_PW, res);
                })
            }
        })
    }
}

exports.register = function (req, res, next) {
    if (req.cookies.id != null)
        res.redirect('/');
    followUsers(appConst.CLICK_REGISTER, req, res);
    res.render("register", { errors: null, success: false, title: 'Sign Up' });
};

exports.checkregister = function (req, res, next) {
    //use express-validator
    req.checkBody('username', appConst.INPUT_USERNAME).notEmpty();
    req.checkBody('username', appConst.INPUT_EMAIL).isEmail();
    req.checkBody('password', appConst.INVALID_PASSWORD).notEmpty().len(8, 30);
    req.checkBody('password_confirmation', appConst.CONFIRM_PW).equals(req.body.password);
    req.checkBody('name', appConst.INPUT_NAME).notEmpty();
    req.checkBody('phone', appConst.INPUT_PHONE).notEmpty();
    req.checkBody('phone', appConst.PHONE_INVALID).isInt();
    req.checkBody('address', appConst.INPUT_ADDRESS).notEmpty();
    var errors = req.validationErrors();
    var subject = "Sign Up";
    if (errors) {
        followUsers(appConst.SIGNUP_INVALID, req, res);
        res.render("register", { errors: errors, success: false, title: subject });
    } else {
        var username = req.body.username;
        userModel.GetUserByUsername(username, function (error, user) {
            if (error) {
                followUsers(appConst.SIGNUP_ERR, req, res);
                res.render("register", { errors: errors, success: false, title: subject });
            }
            if (user) {
                errors = [{ param: 'username', msg: appConst.EMAIL_TAKEN, value: '' }];
                followUsers(appConst.ACCOUNT_USED + username, req, res);
                res.render("register", { errors: errors, success: false, title: subject });
            } else {
                sendHTMLEmail(appConst.MAIL_USER, username, subject, getMailContent(subject, new Date()));
                var newUser = new userModel({ username: req.body.username, password: req.body.password, name: req.body.name, phone: req.body.phone, address: req.body.address, balance: appConst.BALANCE_INIT, status: 'Valid' });
                userModel.addUser(newUser);
                var newActivity = new activityModel({ username: req.body.username, name: subject, click: 'register', details: appConst.SIGNUP_DETAIL + req.body.username, note: appConst.ACCOUNT_INIT, content: appConst.TKS_SIGNUP, response: appConst.NO_RES });
                activityModel.addActivity(newActivity);
                followUsers(appConst.SIGNUP_SUCESS + username, req, res);
                res.render("register", { errors: false, success: true, title: subject });
            }
        })
    }
};

function getRoomNameCustomerClicked(follow_users) {
    if (follow_users.page_access.includes('room-details'))
        return follow_users.page_access.substring(26, 29);
    if (follow_users.page_access.includes('click image in rooms'))
        return follow_users.page_access.substring(22, 25);
    if (follow_users.page_access.includes('book room'))
        return follow_users.page_access.substring(10, 13);
    if (follow_users.page_access.includes('send feedback for room'))
        return follow_users.page_access.substring(23, 26);
    return '';
}

function updateNewIpSuggest(ipSuggestModel, ipSuggest, userip) {
    ipSuggest.count = userip.count + 1;
    ipSuggest.size = (userip.size + ipSuggest.size) * 1.0 / 2;
    ipSuggest.price = (userip.size + ipSuggest.size) * 1.0 / 2;
    ipSuggest.avgAminities = (userip.size + ipSuggest.size) * 1.0 / 2;
    if (ipSuggestIsAbleToUpdate(ipSuggest)) {
        ipSuggestModel.update(userip._id, ipSuggest);
    }
}

exports.getRoomSuggestion = function (request, response) {
    var ip_address = getIpAddress(request);

    if(appConst.DB_SYSTEM == 'sql only' || appConst.DB_SYSTEM == 'mongodb + sql')
    httpRequest({ url: appConst.ROOM_API_URL, json: true }, function (error, res, rooms) {
        if (!error && res.statusCode === 200) {
            ipSuggestModel.findByUserIP(ip_address, function (err, ip_suggest) {
                if (err) {
                    console.log(err);
                } else if (ip_suggest) {
                    //console.log('ip exist on db');
                    response.send(getSuggestionRoom(rooms, ip_suggest.price, ip_suggest.size, ip_suggest.avgAminities)).status(200);
                } else {
                    //console.log('new ip');
                    response.send(getSuggestionRoom(rooms, appConst.DEFAULT_ROOM_PRICE, appConst.DEFAULT_ROOM_SIZE, appConst.DEFAULT_ROOM_AMINITY)).status(200);
                }
            });
        }
    });

    if(appConst.DB_SYSTEM == 'mongodb only')  // old version mongodb 
    roomModel.find({}, function (err, rooms) {
        if (err) {
            response.send(err).status(404);
        } else {
            ipSuggestModel.findByUserIP(ip_address, function (err, ip_suggest) {
                if (err) {
                    console.log(err);
                } else if (ip_suggest) {
                    //console.log('ip exist on db');
                    response.send(getSuggestionRoom(rooms, ip_suggest.price, ip_suggest.size, ip_suggest.avgAminities)).status(200);
                } else {
                    //console.log('new ip');
                    response.send(getSuggestionRoom(rooms, appConst.DEFAULT_ROOM_PRICE, appConst.DEFAULT_ROOM_SIZE, appConst.DEFAULT_ROOM_AMINITY)).status(200);
                }
            });
        }
    });
};

function updateRecommemdationRoom(follow_users, ip_address) {
    var roomname = getRoomNameCustomerClicked(follow_users);

    if (roomname != '') {
        if(appConst.DB_SYSTEM == 'sql only' || appConst.DB_SYSTEM == 'mongodb + sql')
        httpRequest({ url: appConst.ROOM_API_URL + roomname, json: true }, function (error, res, room) {
            if (!error && res.statusCode === 200) {
                ipSuggestModel.findByUserIP(ip_address, function (err, userip) {
                    if (err)
                        console.log(err);
                    var ipSuggest = new ipSuggestModel({ ip: ip_address, size: room.size, price: room.price, avgAminities: room.avgAminities, count: 1, });
                    if (userip)
                        updateNewIpSuggest(ipSuggestModel, ipSuggest, userip);
                    else
                        ipSuggestModel.add(ipSuggest);
                });
            }
        });

        if(appConst.DB_SYSTEM == 'mongodb only')  // old version mongodb 
        roomModel.findRoomByRoomName(roomname, function (err, room) {
            if (err) {
                console.log(err);
            } else {
                ipSuggestModel.findByUserIP(ip_address, function (err, userip) {
                    if (err)
                        console.log(err);
                    var ipSuggest = new ipSuggestModel({ ip: ip_address, size: room.size, price: room.price, avgAminities: room.avgAminities, count: 1, });
                    if (userip)
                        updateNewIpSuggest(ipSuggestModel, ipSuggest, userip);
                    else
                        ipSuggestModel.add(ipSuggest);
                });
            }
        });
    }
}

function saveFollowUserByIP(follow_users, ip_address, external_ip, response) {
    // var geo = geoip.lookup(external_ip);
    // console.log(geo);
    follow_users['user_ip_address'] = ip_address;
    follow_users['external_ip_address'] = external_ip;
    // follow_users['range'] = geo.range;
    // follow_users['country'] = geo.country;
    // follow_users['region'] = geo.region;
    // follow_users['city'] = geo.city;
    // follow_users['ll'] = geo.ll;
    // follow_users['metro'] = geo.metro;
    // follow_users['zip'] = geo.zip;
    if (follow_users.username == null || follow_users.username == '')
        follow_users.username = "guest";
    follow_users.save(function (err, resource) {
        postApi(response, err, resource);
    });
    updateRecommemdationRoom(follow_users, ip_address);
}

function saveFollowUserData(request, response, ip_address, external_ip) {
    saveFollowUserByIP(new followUserModel(request.body), ip_address, external_ip, response)
}

function followUserBehavior(request, page_access, duration, username) {
    let ip_address = getIpAddress(request);
    if (appConst.RUN_ON_SERVER == 'online') {
        //updateFollowUserBehavior(appConst.LIST_IP_ADDRESS_TEST[1], appConst.LIST_IP_ADDRESS_TEST[1], page_access, username, duration);
        updateFollowUserBehavior(ip_address, ip_address, page_access, username, duration);
    }
    if (appConst.RUN_ON_SERVER == 'localhost') {
        getIP(function (err, external_ip) {
            if (err)
                console.log(err);
            else {
                updateFollowUserBehavior(ip_address, external_ip, page_access, username, duration);
            }
        });
    }
}

function updateFollowUserBehavior(ip_address, external_ip, page_access, username, duration) {
    var newFU = new followUserModel({ user_ip_address: ip_address, external_ip_address: external_ip, page_access: page_access, username: username, duration: duration });

    // var geo = geoip.lookup(external_ip);
    // var newFU = new followUserModel({ user_ip_address: ip_address, external_ip_address: external_ip, page_access: page_access, username: username, duration: duration, range: geo.range, country: geo.country, region: geo.region, city: geo.city, ll: geo.ll, metro: geo.metro, zip: geo.zip });
    if (followUserIsAbleToUpdate(newFU)) {
        followUserModel.add(newFU);
    }
}

function followUsers(new_page_access, req, res) {
    var username = req.cookies['username'];
    if (username == '' || username == null)
        username = 'guest';
    if (req.cookies['page_access'] == null || req.cookies['time_access'] == null) {
        // if no page access => store new page acess and time access
        res.cookie('page_access', new_page_access, { maxAge: 60 * 60 * 1000 }); // 1 hour
        res.cookie('time_access', Date.now().toString(), { maxAge: 60 * 60 * 1000 }); // 1 hour
    } else {
        // if access a page before => update this page to db + store 'new page access'

        // update 'page before' to db
        var page_access_before = req.cookies['page_access'];
        var time_access_before = req.cookies['time_access'];
        var new_time_access = Date.now();
        var duration = new_time_access - +time_access_before; // total time stay in 'before page'
        followUserBehavior(req, page_access_before, duration, username);

        // store 'new page access'
        res.cookie('page_access', new_page_access, { maxAge: 60 * 60 * 1000 }); // 1 hour
        res.cookie('time_access', new_time_access.toString(), { maxAge: 60 * 60 * 1000 }); // 1 hour
    }
}

// get client ip address
function getIpAddress(request) {
    if (appConst.RUN_ON_SERVER == 'online') {
        let ip =  request.header('x-forwarded-for') || request.connection.remoteAddress;
        if(ip == '::1')
            return appConst.DEFAULT_IP;
        else
            return ip
    }
    else if (appConst.RUN_ON_SERVER == 'localhost') {
        var ip_address = '';
        var os = require('os');
        var ifaces = os.networkInterfaces();
        Object.keys(ifaces).forEach(function (ifname) {
            var alias = 0;
            ifaces[ifname].forEach(function (iface) {
                if ('IPv4' !== iface.family || iface.internal !== false)
                    return;
                if (alias >= 1)
                    ip_address = iface.address;
                else
                    ip_address = iface.address;
                ++alias;
            });
        });
        return ip_address;
    }
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}


// get list rooms recommendation based on price, size, average Aminities)
function getSuggestionRoom(rooms, price, size, avgAminities) {
    var arrP = get4NumNearest(rooms, 'price', price);
    var arrS = get4NumNearest(rooms, 'size', size);
    var arrA = get4NumNearest(rooms, 'avgAminities', avgAminities);
    return arrP.concat(arrS).concat(arrA).unique();
}

// get 4 nearest elements (compare by size, price, average Aminities of a room)
function get4NumNearest(rooms, att, value) {
    var temp = [];
    for (var i = 0; i < rooms.length; i++) {
        var attvalue = 0;
        if (att == 'size')
            attvalue = rooms[i].size;
        if (att == 'price')
            attvalue = rooms[i].price;
        if (att == 'avgAminities')
            attvalue = rooms[i].avgAminities;
        temp[i] = Math.abs(attvalue - value); // to dind the minimun distance between a room and data tracking
    }
    var result = getIndicesOfMin(temp, 4);
    var finalresult = [];
    for (var i = 0; i < result.length; i++)
        finalresult[i] = rooms[result[i]];
    return finalresult;
}


// get list n smallest elements in array
function getIndicesOfMin(inp, n) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > n) {
            outp.sort(function (a, b) { return inp[a] - inp[b]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}

// merge array
Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

// Validate function
function checkNotNull(...items) {
    for (var i = 0; i < items.length; i++)
        if (items[i] == null || items[i] == '')
            return false;
    return true;
}

function checkIsNaturalNumber(...items) {
    var pattern = /^(0|([1-9]\d*))$/;
    for (var i = 0; i < items.length; i++)
        if (!pattern.test(items[i]))
            return false;
    return true;
}

function checkIsPositiveFloat(...items) {
    for (var i = 0; i < items.length; i++)
        if (Number(items[i]) <= 0)
            return false;
    return true;
}

function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function isValidIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
        return (true)
    }
    return (false)
}

function isValidUsername(username) {
    return checkNotNull(username) && isValidEmail(username);
}

function isValidUser(user) {
    return isValidUsername(user) || user == 'guest';
}

function isAceptableUser(user) {
    return isValidUsername(user) || user.includes('A guest');
}

function isAceptablePageAccess(pageAccess) {
    return pageAccess != 'click link /hotel-services' && pageAccess != 'click link /room-details:';
}

// Check before update
function activityIsAbleToUpdate(activity) {
    return isAceptableUser(activity.username) && checkNotNull(activity.name, activity.click, activity.details, activity.note, activity.content) && appConst.ACTIVITY_RESPONSE_STATUS.includes(activity.response);
}

function followUserIsAbleToUpdate(followUser) {
    return isValidUser(followUser.username) && checkIsNaturalNumber(followUser.duration) && checkNotNull(followUser.page_access) && isValidIPaddress(followUser.user_ip_address) && isValidIPaddress(followUser.external_ip_address) && isAceptablePageAccess(followUser.pageAccess);
}

function ipSuggestIsAbleToUpdate(ipSuggest) {
    return checkIsPositiveFloat(ipSuggest.size, ipSuggest.price, ipSuggest.avgAminities) && checkIsNaturalNumber(ipSuggest.count);
}


// old version mongodb 
if(appConst.DB_SYSTEM == 'mongodb only') {
    var roomModel = require('../models/room-model.js');
    var serviceModel = require('../models/hotel-service-model');

    exports.getRoomByID = function (request, response) {
        var id = request.params.id;
        roomModel.findById(id, function (err, res) {
            getApi(response, err, res);
        });
    };

    exports.getRoomByName = function (request, response) {
        var roomname = request.params.name;
        roomModel.findRoomByRoomName(roomname, function (err, res) {
            getApi(response, err, res);
        });
    };

    exports.getRoom = function (request, response) {
        roomModel.find({}, function (err, res) {
            getApi(response, err, res);
        });
    };

    exports.putRoom = function (req, response, next) {
        let room = req.body;
        roomModel.findByIdAndUpdate(room._id, room, function (err, res) {
            if (err) return next(err);
            else {
                response.json(res);
            }
        });
    };

    exports.getSerivceByID = function (request, response) {
        var id = request.params.id;
        serviceModel.findById(id, function (err, res) {
            getApi(response, err, res);
        });
    };

    exports.getService = function (request, response) {
        serviceModel.find({}, function (err, res) {
            getApi(response, err, res);
        });
    };

    exports.putService = function (req, response, next) {
        serviceModel.findByIdAndUpdate(req.params.id, req.body, function (err, res) {
            if (err) return next(err);
            else {
                response.json(res);
            }
        });
    };
} 