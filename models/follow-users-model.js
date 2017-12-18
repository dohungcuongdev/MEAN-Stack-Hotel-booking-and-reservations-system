var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var followUserSchema = new Schema(
    {
        user_ip_address: String,
        external_ip_address: String,
        username: String,
        page_access: String,
        duration: Number,
        range: Array,
        country: String,
        region: String,
        city: String,
        ll: Array,
        metro: Number,
        zip: Number,
        created_at: { type: Date, default: Date.now }
    },
    {
        collection: 'follow-users'
    }
);
var follow_users = module.exports = mongoose.model('follow_users', followUserSchema);

module.exports.findAll = function (callbackAction) {
    follow_users.find({}, callbackAction).sort({"created_at": -1});
};

module.exports.findByUserIP = function (user_ip_address, callbackAction) {
    var query = { user_ip_address: user_ip_address };
    follow_users.find(query, callbackAction).sort({"created_at": -1});
};

module.exports.findExternalIP = function (external_ip_address, callbackAction) {
    var query = { external_ip_address: external_ip_address };
    follow_users.findOne(query, callbackAction).sort({"created_at": -1});
};

module.exports.add = function (newFolowUsersModel) {
    newFolowUsersModel.save();
};