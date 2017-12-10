var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var roomSchema = new Schema(
    {
        name: String,
        size: Number,
        price: Number,
        numpeople: Number,
        status: String,
        booked_by: String,
        checkin: String,
        checkout: String,
        img: String,
        img2: String,
        type: String,
        details: String,
        amenities: String,
        star: Number,
        numvote: Number,
        avgAminities: Number
    },
    {
        collection: 'rooms'
    }
);
var room = module.exports = mongoose.model('rooms', roomSchema);

//function get room by roomname
module.exports.findRoomByRoomName = function (roomname, callbackAction) {
    var query = {name: roomname};
    room.findOne(query, callbackAction)
};