

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var hotelServiceSchema = new Schema(
    {
        id: String,
        name: String,
        type: String,
        price: Number,
        img: String,
        img2: String,
        quantity: Number,
        details: String,
        note: String
    },
    {
        collection: 'hotel-services'
    }
);
var hotel_service = module.exports = mongoose.model('hotel-services', hotelServiceSchema);

//function get hotel_service by servicename
module.exports.findServiceByName = function (servicename, callbackAction) {
    var query = {name: servicename};
    hotel_service.findOne(query, callbackAction)
};

