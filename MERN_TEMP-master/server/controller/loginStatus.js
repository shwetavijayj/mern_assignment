var mongo = require('../mongoConnect');

var uniqid = require('uniqid');

var loginModel = mongo.mongoose.model('LoginStatus', mongo.loginStatusSchema, "loginStatus");

function enterLoginDetails(userData,callback){
    userDetails = {
        LoginStatusId: uniqid.process(),
        UserName:userData.UserName,
        DateTime: userData.DateTime,
        IPAddress:userData.IPAddress
    }
    loginModel.create(userDetails,(err,res)=>{
        if(err){
            callback(err);
        }
        else{
            callback(null,res);
        }
    })
} 
module.export = {
    enterLoginDetails
}