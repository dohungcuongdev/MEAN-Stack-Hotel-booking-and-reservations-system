var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var userSchema = new Schema(
        {
            username: {type: String, require: true, trim: true},
            password: String,
            name: String,
            phone: String,
            address: String,
            balance: Number,
            created_at: {type: Date, default: Date.now}
        },
        {
            collection: 'customers'
        }
);
var User = module.exports = mongoose.model('User', userSchema);

//function add new user
module.exports.addUser = function (newuser) {
    bcrypt.genSalt(10, function (err, salt) {// user bcryptJS to encrypt the password
        bcrypt.hash(newuser.password, salt, function (err, hash) {
            newuser.password = hash;
            newuser.save();
        });
    });

};

//function get user by username
module.exports.GetUserByUsername = function (username, callbackAction) {
    var query = {username: username};
    User.findOne(query, callbackAction)
};

//compare password
module.exports.comparePwd = function (password, hash, callback) {
    bcrypt.compare(password, hash, function (err, isMatch) {
        if (err)
            throw err;
        callback(null, isMatch);
    });
};

module.exports.GetUserByID = function (id, callback) {
    User.findById(id,callback);
};

module.exports.updatePassword = function (username, newpassword) {
    bcrypt.genSalt(10, function (err, salt) {// user bcryptJS to encrypt the password
        bcrypt.hash(newpassword, salt, function (err, hash_newpassword) {
            var myquery = { username: username };
            var newvalues = { password: hash_newpassword };
            User.updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("password updated");
            });
        });
    });
};

