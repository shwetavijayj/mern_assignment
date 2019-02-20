var express = require('express');
var router = express.Router();
var mongoose = require('../mongoConnect');
var authuser = require('../controller/login');
var userInfo = require('../controller/getUsers');
var createUser = require('../controller/createUser');
var userRole = require('../controller/userRole');
var updateUser = require('../controller/registerUser');
var createToken = require('../jwtoken');

/// User creation and user details fetch APIs calls

router.post('/createUser', function (req, res) {
  if (mongoose) {
    data = {
      UserName: req.body.UserName,
      EmailAddress: req.body.EmailAddress,
      roleName: req.body.roleName,
      Password: req.body.UserName + '@123'
    }
    createUser.createUser(data, (err, response) => {
      if (err) {
        res.send({ 'Error in user creation': err, statusCode: 403 })
      } else {
        res.send({ msg: 'User created successfully', statusCode: 200 });
      }
    })
  }
  else {
    res.send({ msg: 'not connected to database', statusCode: 500 });
  }
});

router.post('/userRole', function (req, response) {
  if (mongoose) {
    
    userRole.createRole(req.body, (err, res) => {
      if (err) {
        response.send({ 'Error in user role creation': err, statusCode: 403 });
      } else {
        response.send({ msg: 'User role created successfully', statusCode: 200 });
      }
    })
  }
  else {
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
})

router.post('/updateUser', function (req, response) {
  if (mongoose) {
    data = {
      'UserId': 12345,
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
        'Addr1': 'xxxx',
        'Addr2': 'yyyy',
        'Addr3': 'zzzz'
      },
      'City': 'Pune',
      'State': 'Mah',
      'Pincode': 411057,
      'Phone': 0,
      'Mobile': 9999999988,
      'PhysicalDisability': 'NA',
      'MaritalStatus': 'U',
      'EduStatus': 'Masters',
      'BirthSign': 'NA',
      'UserName': 'shweta123'
    }
    updateUser.updateUserDetails(data, (err, res) => {
      if (err) {
        response.send({ 'Error in user role creation': err, statusCode: 403 })
      } else {
        response.send({ msg: 'User updated successfully', statusCode: 200 });
      }
    })
  }
  else {
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
});

router.post('/updateUserTemp', function (req, response) {
  if (mongoose) {
    data = {
      'UserId': 12345,
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
        'Addr1': 'xxxx',
        'Addr2': 'yyyy',
        'Addr3': 'zzzz'
      },
      'City': 'Pune',
      'State': 'Mah',
      'Pincode': 411057,
      'Phone': 0,
      'Mobile': 9999999988,
      'PhysicalDisability': 'NA',
      'MaritalStatus': 'U',
      'EduStatus': 'Masters',
      'BirthSign': 'NA',
      'UserName': 'shweta123'
    }
    updateUser.updateTempUserDetails(data, (err, res) => {
      if (err) {
        response.send({ 'Error in user role creation': err, statusCode: 403 })
      } else {
        response.send({ msg: 'User updated successfully', statusCode: 200 });
      }
    })
  }
  else {
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
});

router.get('/getTemporaryUsers',function(req,response){
  if(mongoose){
    userInfo.getAllTempUsersInformation((err,res)=>{
      if(err){
        response.send({ 'Error in fetching temporary data.': err, statusCode: 403 })
      }
      
      response.send({msg:'Data fetched successfully',data:res});
    })
  }else{
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
})

router.post('/registerUser',function(req,response){
  if(mongoose){
    updateUser.registerUser(req.body,(err,res)=>{
      if(err){
        response.send({ 'Error in Storing data.': err, statusCode: 403 })
      }else{
        response.send({msg:'Data saved successfully',data:res});
      }
    })
  }
  else{
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
})

router.post('/rejectUserRequest',function(req,response){
  if(mongoose){
    updateUser.rejectUserRequest(req.body,(err,res)=>{
      if(err){
        response.send({ 'Error in reject update data.': err, statusCode: 403 })
      }
      else{
        response.send({msg:'Data saved successfully',data:res});
      }
    })
  }
  else{
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
});

router.get('/getUserRole',function(req,response){
  if(mongoose){
    userRole.getAllRole((err,res)=>{
      if(err){
        response.send({ 'Error in fetching user role.': err, statusCode: 403 });
      }
      else{
        response.send({msg:'Data fetched successfully',data:res});
      }
    })
  }else{
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
})


router.post('/registerUserTemp',function(req,response){
  if(mongoose){
    updateUser.registerUserTemporary(req.body,(err,res)=>{
      if(err){
        response.send({ 'Error in Storing data.': err, statusCode: 403 });
      }else{
        response.send({msg:'Data saved successfully',data:res});
      }
    })
  }else{
    response.send({ msg: 'not connected to database', statusCode: 500 });
  }
})

router.post('/updateUserTemp',function(req,response){
  if(mongoose){
    updateUser.updateTempUserDetails(req.body,(err,res)=>{
      if(err){
        response.send({ 'Error in Updating data.': err, statusCode: 403 })
      }else{
        response.send({msg:'Data updated successfully',data:res});
      }
    })
  }
})

module.exports = router;
