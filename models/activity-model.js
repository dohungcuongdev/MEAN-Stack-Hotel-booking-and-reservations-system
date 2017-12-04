

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var activitySchema = new Schema(
    {
        username: String,
        name: String,
        click: String,
        details: String,
        note: String,
        content: String,
        response: String,
        created_at: { type: Date, default: Date.now }
    },
    {
        collection: 'activity'
    }
);
var activity = module.exports = mongoose.model('activity', activitySchema);

//function get activity by username
module.exports.findActivityByUserName = function (username, callbackAction) {
    var query = { username: username };
    activity.find(query, callbackAction)
};

module.exports.findFeedbackRoom = function (room_id, callbackAction) {
    var query = { name: 'Feedback Room', click: room_id };
    activity.find(query, callbackAction)
};

module.exports.addActivity = function (newActivity) {
    newActivity.save();
};

