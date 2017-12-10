var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var ipSuggestSchema = new Schema(
    {
        ip: String,
        size: Number,
        price: Number,
        avgAminities: Number,
        count: Number
    },
    {
        collection: 'ip-suggest'
    }
);

var ipSuggest = module.exports = mongoose.model('ip-suggest', ipSuggestSchema);

module.exports.findByUserIP = function (ip, callbackAction) {
    var query = { ip: ip };
    ipSuggest.findOne(query, callbackAction)
};

module.exports.add = function (newIPSuggest) {
    newIPSuggest.save();
};

module.exports.update = function (id, newIPSuggest) {
    ipSuggest.findOne({ '_id': id }, function (err, ipSuggested) {
			if(err || ipSuggested == null){
				console.log(err);
			}else{
                ipSuggested.remove({ _id: id }, function (err, resource) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(newIPSuggest);
                        ipSuggested = newIPSuggest;
                        ipSuggested._id = id;
                        ipSuggested.save(function(err){
                            if(err) console.log(err);
                            else {
                                //console.log("Updated");
                            }
                        });
                    }
                })
			}
		});
};