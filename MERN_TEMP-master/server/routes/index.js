var express = require('express');
var router = express.Router();
var mongoose = require('../mongoConnect');
var authuser = require('../controller/login');
var userInfo = require('../controller/getUsers');
var createUser = require('../controller/createUser');
var createToken = require('../jwtoken');
var loginStatus = require('../controller/loginStatus');
let mobj = {
  'UserId': 0,
  'PersonalUniqueId': 1234567,
  'FullName': {
    'fname': 'Shweta',
    'mname': 'Vijay',
    'lname': 'Joshi'
  },
  'Gender': 'F',
  'DateOfBirth': '13/02/1995',
  'Age': 24,
  'Address': {
    'Addr1': 'Abc',
    'Addr2': 'qwe',
    'Addr3': 'pqr'
  },
  'City': 'Pune',
  'State': 'Mah',
  'Pincode': 411030,
  'Phone': 0,
  'Mobile': 9999999999,
  'PhysicalDisability': 'NA',
  'MaritalStatus': 'U',
  'EduStatus': 'Masters',
  'BirthSign': 'NA',
  'UserName': 'shweta123'
}
/* GET home page. 
  //Login POST route
*/
router.post('/', function (req, res1, next) {
  console.log("req", req);
  data = {
    UserName: req.body.UserName,
    Password: req.body.Password
  }
  loginData = {
    UserName:req.body.UserName,
    DateTime:req.body.DateTime,
    IPAddress:req.body.IPAddress
  }
  if (mongoose) {
    authuser.authenticateUser(data, (err, res) => {
      if (err) {
        res1.send({ 'Error in authenticating user': err });
      }
      else {
        if (res != null) {
          let token = createToken.createToken({ UserName: data.UserName, Password: data.Password });
          console.log(token);
          // res1.render('index', { title: res });
          // loginStatus.enterLoginDetails(loginData,(err,res1)=>{
          //   if(err){
          //     res1.send({ 'Error in saving login details': err });
          //   }else{
              res1.send({ responseToken: token, msg: 'User logged in successfully.', roleId: res.roleId, UserName: res.UserName, UserId: res.UserId });
          //   }
          // })
          
        }
        else {
          res1.send({ msg: 'User not exist' });
        }

      }
    })
  } else {
    res1.send({ msg: 'not connected to mongo' });
  }

});

router.get('/:id', function (req, res) {
  console.log(req.params);
  data = {
    UserId: req.params.id
  }
  if (mongoose) {
    userInfo.getUserInfo(data, (err, resonse) => {
      if (err) {
        res.send({ 'Error in fetching user info:': err })
      }
      else {
        if (res != null) {
          res.send({ 'data': resonse });
        }
        else {
          res.send({ msg: 'User not exist' })
        }
      }
    })
  } else {
    res.send({ msg: 'not connected to mongo' });
  }

});



module.exports = router;
