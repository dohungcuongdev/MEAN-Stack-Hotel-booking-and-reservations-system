var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
var ObjectId = require('mongodb').ObjectID;

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

// find activity that haven't been responsed yet
module.exports.findNotResponseActivity = function (username, callbackAction) {
    var query = { response: "Not Yet" };
    activity.find(query, callbackAction)
};

module.exports.findFeedbackRoom = function (roomid, callbackAction) {
    var query = { name: 'Feedback Room', click: roomid };
    activity.find(query, callbackAction)
};

module.exports.addActivity = function (newActivity) {
    newActivity.save();
};

module.exports.updateResponse = function(id, response) {
    var query = { _id: id };
    var newvalues = { $set: { response: response } };
    activity.updateOne(query, newvalues, function(err, res) {
        if (err) console.log(err);
        console.log("1 document updated");
    });
}