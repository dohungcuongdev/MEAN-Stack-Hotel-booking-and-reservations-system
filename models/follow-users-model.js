

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
        country: String,
        city: String,
        created_at: { type: Date, default: Date.now }
    },
    {
        collection: 'follow-users'
    }
);
var follow_users = module.exports = mongoose.model('follow_users', followUserSchema);

module.exports.findByUserIP = function (user_ip_address, callbackAction) {
    var query = { user_ip_address: user_ip_address };
    follow_users.find(query, callbackAction)
};


module.exports.add = function (newFolowUsersModel) {
    newFolowUsersModel.save();
};
