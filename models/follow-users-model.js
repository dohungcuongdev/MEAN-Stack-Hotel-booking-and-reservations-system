var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var appConst = require('../const/app-const');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var followUserSchema = new Schema(
    {
        user_ip_address: String,
        external_ip_address: String,
        username: String,
        page_access: String,
        duration: Number,
        // range: Array,
        // country: String,
        // region: String,
        // city: String,
        // ll: Array,
        // metro: Number,
        // zip: Number,
        created_at: { type: Date, default: Date.now }
    },
    {
        collection: 'follow-users'
    }
);
var follow_users = module.exports = mongoose.model('follow_users', followUserSchema);

module.exports.findAll = function (callbackAction) {
    follow_users.find({}, callbackAction).sort({ "created_at": -1 });
};

module.exports.findFollowUserByPage = function (page, callbackAction) {
    var begin = (page - 1) * appConst.NUM_TRACKING_EACH_PAGE;
    follow_users.find({}, callbackAction).sort({ "created_at": -1 }).skip(begin).limit(appConst.NUM_TRACKING_EACH_PAGE);
};

module.exports.countClickTracking = function (callbackAction) {
    follow_users.count({}, callbackAction);
};

module.exports.findSortedTrackingData = function (field_name, callbackAction) {
    follow_users.find({}, callbackAction).sort({ [field_name]: -1 }).skip(0).limit(appConst.NUM_TRACKING_EACH_PAGE);
};

module.exports.findSortedTrackingData2 = function (fieldname, sort, page, callbackAction) {
    var begin = (page - 1) * appConst.NUM_TRACKING_EACH_PAGE;
    var sortQuery = { [fieldname]: -1 };
    if (sort == 'asc')
        sortQuery = { [fieldname]: 1 };
    follow_users.find({}, callbackAction).sort(sortQuery).skip(begin).limit(appConst.NUM_TRACKING_EACH_PAGE);
};

var getSearchDateQuery = function(keyword) {
    var date1 = new Date(keyword).toISOString();
    var date2 = new Date(new Date(keyword).getTime() + 1 * 17 * 60 * 60 * 1000).toISOString(); //IOS date next day
    return { created_at: { '$gte': new Date(date1), '$lt': new Date(date2)}};
}

var getSearchDurationQuery = function(keyword) {
    let d = keyword.split(',');
    let d1 = parseInt(d[0]);
    let d2 = parseInt(d[1]);
    return { duration: { '$gte': d1, '$lt': d2}};
}

module.exports.searchTrackingData = function (fieldname, keyword, sort, page, callbackAction) {
    var begin = (page - 1) * appConst.NUM_TRACKING_EACH_PAGE;
    var sortQuery = { [fieldname]: -1 };
    var query = { [fieldname]: new RegExp(keyword) };
    if (sort == 'asc')
        sortQuery = { [fieldname]: 1 };
    if (fieldname == 'created_at') {
        query = getSearchDateQuery(keyword);
    } else if (fieldname == 'duration') {
        query = getSearchDurationQuery(keyword);
    }
    follow_users.find(query, callbackAction).sort(sortQuery).skip(begin).limit(appConst.NUM_TRACKING_EACH_PAGE);
};

module.exports.countSearchPage = function (fieldname, keyword, callbackAction) {
    if (fieldname == 'created_at') {
        query = getSearchDateQuery(keyword);
    } else if (fieldname == 'duration') {
        query = getSearchDurationQuery(keyword);
    } else
        query = { [fieldname]: new RegExp(keyword) };
    follow_users.count(query, callbackAction);
};

module.exports.findByUserIP = function (user_ip_address, callbackAction) {
    var query = { user_ip_address: user_ip_address };
    follow_users.find(query, callbackAction).sort({ "created_at": -1 });
};

module.exports.findExternalIP = function (external_ip_address, callbackAction) {
    var query = { external_ip_address: external_ip_address };
    follow_users.findOne(query, callbackAction).sort({ "created_at": -1 });
};

module.exports.findCountryChartData = function (callbackAction) {
    var query = [{ "$group": { _id: "$country", count: { $sum: 1 } } }];
    follow_users.aggregate(query, callbackAction);
};

module.exports.findExternalIPStatistics = function (callbackAction) {
    var query = [{ "$group": { _id: "$external_ip_address", count: { $sum: 1 } } }];
    follow_users.aggregate(query, callbackAction);
};

module.exports.findIPStatistics = function (callbackAction) {
    var query = [{ "$group": { _id: "$user_ip_address", count: { $sum: 1 } } }];
    follow_users.aggregate(query, callbackAction);
};

module.exports.findUsernameStatistics = function (callbackAction) {
    var query = [{ "$group": { _id: "$username", count: { $sum: 1 } } }];
    follow_users.aggregate(query, callbackAction);
};

module.exports.findPageAccessStatistics = function (callbackAction) {
    var query = [{ "$group": { _id: "$page_access", count: { $sum: 1 } } }];
    follow_users.aggregate(query, callbackAction);
};

module.exports.findPageAccessByIP = function (user_ip_address, callbackAction) {
    var query = [{ $match: { user_ip_address: user_ip_address } }, { "$group": { _id: "$page_access", count: { $sum: 1 } } },]
    follow_users.aggregate(query, callbackAction);
};

module.exports.findPageAccessByUsername = function (username, callbackAction) {
    var query = [{ $match: { username: username } }, { "$group": { _id: "$page_access", count: { $sum: 1 } } },]
    follow_users.aggregate(query, callbackAction);
};

module.exports.add = function (newFolowUsersModel) {
    newFolowUsersModel.save();
};