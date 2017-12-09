var activityModel = require('../models/activity-model');
var userModel = require('../models/user-model.js');
var roomModel = require('../models/room-model.js');
var serviceModel = require('../models/hotel-service-model');
var followUserModel = require('../models/follow-users-model');
var ipSuggestModel = require('../models/ip-suggest-model');

const getIP = require('external-ip')();
var geoip = require('geoip-lite');
var externalip = require('externalip');
var cookie = require('cookie');

//const
var appConst = require('../const/app-const');

exports.getActivityByUserName = function (request, response) {
    if (request.cookies.id == null)
        response.send(null).status(404);
    else {
        var username = request.params.username;
        activityModel.findActivityByUserName(username, function (err, res) {
            if (err) {
                response.send(err).status(404);
            } else {
                response.send(res).status(200);
            }
        });
    }
};

exports.getActivityByID = function (request, response) {
    if (request.cookies.id == null)
        response.send(null).status(404);
    else {
        var id = request.params.id;
        activityModel.findById(id, function (err, res) {
            if (err) {
                response.send(err).status(404);
            } else {
                response.json(res);
            }
        });
    }
};

exports.getActivityFeedBackRoom = function (request, response) {
    var id = request.params.id;
    activityModel.findFeedbackRoom(id, function (err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(res).status(200);
        }
    });
};


exports.getActivity = function (request, response) {
    if (request.cookies.id == null)
        response.send(null).status(404);
    else {
        activityModel.find({}, function (err, resources) {
            if (err) {
                response.send(err).status(404);
            } else {
                response.send(resources).status(200);
            }
        });
    }
};

exports.deleteActivity = function (request, response) {
    var id = request.params.id;
    activityModel.remove({ _id: id }, function (err, resource) {
        if (err) {
            return response.send(err);
        } else {
            response.send(resource);
        }
    });
};

exports.postActivity = function (request, response) {
    var activity = new activityModel(request.body);
    activity.save(function (err, resource) {
        if (err) {
            response.send(err).status(501);
        } else {
            response.json(resource).status(201);
        }
    });
};


exports.getUserByID = function (request, response) {
    if (request.cookies.id == null)
        response.send(null).status(404);
    else {
        var id = request.params.id;
        userModel.GetUserByID(id, function (err, res) {
            if (err) {
                return response.send(err);
            } else {
                var user = res;
                response.json(user);
            }
        });
    }
};


exports.getUser = function (request, response) {
    if (request.cookies.id == null)
        response.send(null).status(404);
    else {
        userModel.find({}, function (err, resources) {
            if (err) {
                response.send(err).status(404);
            } else {
                response.send(resources).status(200);
            }
        });
    }
};

exports.putUser = function (req, res, next) {
    userModel.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        else {
            res.json(user);
        }
    });
};

exports.getRoomByID = function (request, response) {
    var id = request.params.id;
    roomModel.findById(id, function (err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.json(res);
        }
    });
};


exports.getRoom = function (request, response) {
    roomModel.find({}, function (err, resources) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(resources).status(200);
        }
    });
};

exports.putRoom = function (req, res, next) {
    roomModel.findByIdAndUpdate(req.params.id, req.body, function (err, room) {
        if (err) return next(err);
        else {
            res.json(room);
        }
    });
};

exports.getSerivceByID = function (request, response) {
    var id = request.params.id;
    serviceModel.findById(id, function (err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.json(res);
        }
    });
};

exports.getService = function (request, response) {
    serviceModel.find({}, function (err, resources) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(resources).status(200);
        }
    });
};


exports.putService = function (req, res, next) {
    serviceModel.findByIdAndUpdate(req.params.id, req.body, function (err, service) {
        if (err) return next(err);
        res.json(service);
    });
};

exports.getFollowUserByUserIP = function (request, response) {
    var userIP = request.params.userIP;
    followUserModel.findByUserIP(userIP, function (err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(res).status(200);
        }
    });
};

exports.getFollowUserByID = function (request, response) {
    var id = request.params.id;
    followUserModel.findById(id, function (err, res) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.json(res);
        }
    });
};

exports.getFollowUser = function (request, response) {
    followUserModel.find({}, function (err, resources) {
        if (err) {
            response.send(err).status(404);
        } else {
            response.send(resources).status(200);
        }
    });
};

exports.deleteFollowUser = function (request, response) {
    var id = request.params.id;
    followUserModel.remove({ _id: id }, function (err, resource) {
        if (err) {
            return response.send(err);
        } else {
            response.send(resource);
        }
    })
};

exports.postFollowUser = function (request, response) {
    getIP((err, external_ip) => {
        if (err) {
            //console.log(err);
            saveFollowUserData(request, response, appConst.DEFAULT_IP);
        } else {
            saveFollowUserData(request, response, external_ip);
        }
    });
};

function saveFollowUserData(request, response, external_ip) {
    var follow_users = new followUserModel(request.body);
    var ip_address = getIpAddress();
    var geo = geoip.lookup(external_ip);
    console.log(geo);
    follow_users['user_ip_address'] = ip_address;
    follow_users['external_ip_address'] = external_ip;
    follow_users['range'] = geo.range;
    follow_users['country'] = geo.country;
    follow_users['region'] = geo.region;
    follow_users['city'] = geo.city;
    follow_users['ll'] = geo.ll;
    follow_users['metro'] = geo.metro;
    follow_users['zip'] = geo.zip;
    follow_users.save(function (err, resource) {
        if (err) {
            response.send(err).status(501);
        } else {
            response.json(resource).status(201);
        }
    });

    var roomname = '';

    if (follow_users.page_access.includes('room-details')) {
        roomname = follow_users.page_access.substring(26, 29);
    }

    if (follow_users.page_access.includes('click image in rooms')) {
        roomname = follow_users.page_access.substring(22, 25);
    }

    if (follow_users.page_access.includes('book room')) {
        roomname = follow_users.page_access.substring(10, 13);
    }

    if (follow_users.page_access.includes('send feedback for room')) {
        roomname = follow_users.page_access.substring(23, 26);
    }

    if (roomname != '') {
        roomModel.findRoomByRoomName(roomname, function (err, room) {
            if (err) {
                console.log(err);
            } else {
                ipSuggestModel.findByUserIP(ip_address, function (err, userip) {
                    if (err) {
                        console.log(err);
                    }
                    var ipSuggest = new ipSuggestModel(
                        {
                            ip: ip_address,
                            size: room.size,
                            price: room.price,
                            avgAminities: room.avgAminities,
                            count: 1,
                        });

                    //console.log(room);

                    if (userip) {
                        //console.log("update");
                        ipSuggest.count = userip.count + 1;
                        ipSuggest.size = (userip.size + ipSuggest.size) * 1.0 / 2;
                        ipSuggest.price = (userip.size + ipSuggest.size) * 1.0 / 2;
                        ipSuggest.avgAminities = (userip.size + ipSuggest.size) * 1.0 / 2;
                        // ipSuggest.size = (userip.size*userip.count + ipSuggest.size)/ipSuggest.count;
                        // ipSuggest.price = (userip.price*userip.count + ipSuggest.price)/ipSuggest.count;
                        // ipSuggest.avgAminities = (userip.avgAminities*userip.count + ipSuggest.avgAminities)/ipSuggest.count;
                        ipSuggestModel.update(userip._id, ipSuggest);
                    } else {
                        //console.log("insert");
                        ipSuggestModel.add(ipSuggest);
                    }
                });
            }
        });
    }
}

exports.getRoomSuggestion = function (request, response) {
    var ip_address = getIpAddress();
    roomModel.find({}, function (err, rooms) {
        if (err) {
            response.send(err).status(404);
        } else {
            ipSuggestModel.findByUserIP(ip_address, function (err, ip_suggest) {
                if (err) {
                    console.log(err);
                } else if (ip_suggest) {
                    response.send(getSuggestionRoom(rooms, ip_suggest.price, ip_suggest.size, ip_suggest.avgAminities)).status(200);
                } else {
                    response.send(getSuggestionRoom(rooms, appConst.DEFAULT_ROOM_PRICE, appConst.DEFAULT_ROOM_SIZE, appConst.DEFAULT_ROOM_AMINITY)).status(200);
                }
            });
        }
    });
};

exports.serializeUser = function (username, done) {
    done(null, username.id);
};

exports.deserializeUser = function (id, done) {
    userModel.GetUserByID(id, function (error, username) {
        done(error, username);
    });
};

exports.checklogin = function (username, password, done) {
    userModel.GetUserByUsername(username, function (error, username) {
        if (error)
            throw error;
        if (!username) {
            followUserBehavior(appConst.LOGIN_FAIL + appConst.INVALID_USERNAME, 0);
            return done(null, false, { message: appConst.INVALID_USERNAME });
        }

        userModel.comparePwd(password, username.password, function (error, isMatch) {
            if (error)
                throw error;
            if (isMatch) {
                return done(null, username);
            } else {
                followUserBehavior(appConst.LOGIN_FAIL + appConst.WRONG_PW, 0);
                return done(null, false, { message: appConst.WRONG_PW });
            }
        });
    });
};

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/login');
    }
}

function followUserBehavior(page_access, duration, username) {
    var ip_address = getIpAddress();
    getIP(function (err, external_ip) {
        if (err) {
            console.log(err);
        } else {
            var geo = geoip.lookup(external_ip);
            var newFolowUsersModel = new followUserModel(
                {
                    user_ip_address: ip_address,
                    external_ip_address: external_ip,
                    page_access: page_access,
                    username: username,
                    duration: duration,
                    range: geo.range,
                    country: geo.country,
                    region: geo.region,
                    city: geo.city,
                    ll: geo.ll,
                    metro: geo.metro,
                    zip: geo.zip,
                });
            followUserModel.add(newFolowUsersModel);
        }
    });
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
    followUserBehavior(page_access, duration, req.cookies['username']);
}

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
    res.render('changepass', { errors: null, success: false,title: 'Change Password' });
};

exports.checkPassword = function (req, res, next) {
    var username = req.cookies.username;
    var current_password = req.body.current_password;
    var new_password = req.body.new_password;
    req.checkBody('current_password', appConst.INPUT_PASSWORD).notEmpty();
    req.checkBody('new_password', appConst.INVALID_PASSWORD).notEmpty().len(8, 30);
    req.checkBody('password_confirmation', appConst.CONFIRM_PW).equals(new_password);
    var errors = req.validationErrors();
    if (errors) {
        followUsers(appConst.SIGNUP_INVALID, req, res);
        res.render("changepass", { errors: errors, success: false, title: "Change Password" });
    } else {
        console.log(current_password);
        console.log(new_password);
        userModel.GetUserByUsername(username, function (error, user) {
            if (user) {
                userModel.comparePwd(current_password, user.password, function (error, isMatch) {
                    if (isMatch) {
                        userModel.comparePwd(new_password, user.password, function (error, isMatch) {
                            if (isMatch) {
                                errors = [{ param: 'current_password', msg: appConst.PW_NOT_CHANGE, value: '' }];
                                followUsers(appConst.CHANGE_PW_FAIL + appConst.PW_NOT_CHANGE, req, res);
                                res.render("changepass", { errors: errors, success: false, title: "Change Password" });
                            } else {
                                userModel.updatePassword(username, new_password);
                                var newActivity = new activityModel(
                                    {
                                        username: username,
                                        name: 'Change password',
                                        click: 'change password',
                                        details: appConst.CHANGE_PW_DETAIL,
                                        note: appConst.CHANGE_PW_NOTE,
                                        content: appConst.CHANGE_PW_CONTENT,
                                        response: appConst.NO_RES
                                    });
                                activityModel.addActivity(newActivity);
                                followUsers(appConst.CHANGE_PW_SUCCESS, req, res);
                                res.render("changepass", { errors: false, success: true, title: "Change Password" });
                            }
                        });
                    } else {
                        errors = [{ param: 'current_password', msg: appConst.WRONG_PW, value: '' }];
                        followUsers(appConst.CHANGE_PW_FAIL + appConst.WRONG_PW, req, res);
                        res.render("changepass", { errors: errors, success: false, title: "Change Password" });
                    }
                })
            }
        }
        )
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
    if (errors) {
        followUsers(appConst.SIGNUP_INVALID, req, res);
        res.render("register", { errors: errors, success: false, title: "Sign Up" });
    } else {
        var username = req.body.username;
        userModel.GetUserByUsername(username, function (error, user) {
            if (error) {
                followUsers(appConst.SIGNUP_ERR, req, res);
                console.log(error);
            }
            if (user) {
                errors = [{ param: 'username', msg: appConst.EMAIL_TAKEN, value: '' }];
                followUsers(appConst.ACCOUNT_USED + username, req, res);
                res.render("register", { errors: errors, success: false, title: "Sign Up" });
            } else {
                var newUser = new userModel(
                    {
                        username: req.body.username,
                        password: req.body.password,
                        name: req.body.name,
                        phone: req.body.phone,
                        address: req.body.address,
                        balance: appConst.BALANCE_INIT
                    });
                userModel.addUser(newUser);

                var newActivity = new activityModel(
                    {
                        username: req.body.username,
                        name: 'Sign up',
                        click: 'register',
                        details: appConst.SIGNUP_DETAIL + req.body.username,
                        note: appConst.ACCOUNT_INIT,
                        content: appConst.TKS_SIGNUP,
                        response: appConst.NO_RES
                    });
                activityModel.addActivity(newActivity);
                followUsers(appConst.SIGNUP_SUCESS + username, req, res);
                res.render("register", { errors: false, success: true, title: "Sign Up" });
            }
        })
    }

};

function getSuggestionRoom(rooms, price, size, avgAminities) {
    var arrP = get4NumNearest(rooms, 'price', price);
    var arrS = get4NumNearest(rooms, 'size', size);
    var arrA = get4NumNearest(rooms, 'avgAminities', avgAminities);
    return arrP.concat(arrS).concat(arrA).unique();
}


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
        temp[i] = Math.abs(attvalue - value);
    }
    var result = getIndicesOfMin(temp, 4);
    var finalresult = [];
    for (var i = 0; i < result.length; i++)
        finalresult[i] = rooms[result[i]];
    return finalresult;
}

function getIndicesOfMin(inp, count) {
    var outp = [];
    for (var i = 0; i < inp.length; i++) {
        outp.push(i); // add index to output array
        if (outp.length > count) {
            outp.sort(function (a, b) { return inp[a] - inp[b]; }); // descending sort the output array
            outp.pop(); // remove the last index (index of smallest element in output array)
        }
    }
    return outp;
}

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

function getIpAddress() {
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
    return ip_address;
}