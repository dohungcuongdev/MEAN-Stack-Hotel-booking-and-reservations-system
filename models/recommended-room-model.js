

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var recommendedRoomSchema = new Schema(
    {
        user_ip_address: String,
        roomid1: String,
        roomid2: String,
        roomid3: String,
        roomid4: String
    },
    {
        collection: 'recommended-room'
    }
);

var recommended_room = module.exports = mongoose.model('recommended-room', recommendedRoomSchema);

