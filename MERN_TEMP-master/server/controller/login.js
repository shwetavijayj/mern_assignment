var mongo = require('../mongoConnect');
var userModel = mongo.mongoose.model('User', mongo.userSchema, "users");

//authenticate user while sign-in and generate token
function authenticateUser(data, callback) {
    console.log(data);
    userModel.findOne({ UserName: data.UserName, Password: data.Password }, function (err, res) {
        if (err) {
            callback(err);
        }
        else {
            if (res != null) {
                callback(null, res);
            }
            else {
                callback(null, null);
            }
        }
    })
};

module.exports = {
    authenticateUser
}