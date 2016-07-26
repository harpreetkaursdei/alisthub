/** 
Controller for the My account managment page 
Created : 2016-05-09
Created By: Ashish dev swami  
Module : My account
*/
var fs         = require('fs');
var moment     = require('moment-timezone');
var path_venue = process.cwd()+'/public/images/venues/';
var request = require('request');

// validate captcha
exports.validate_captcha = function(req,res){
 /*var post_data = querystring.stringify({
    'secret' : SECRET,
    'response': key
  });*/
 console.log(req.body);
  request.post({
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                   "Accept": "application/json"},
        //host: 'www.google.com',
        //port: '443',
        //path: '/recaptcha/api/siteverify',
        url:     'https://www.google.com/recaptcha/api/siteverify',
        form:    req.body }, function(error, response, body){
        if(error){
          console.log(error);
         res.json({"body":"","response":"",code:101});  
        }
        else{
        console.log(response.body);
        res.json({"body":body,"response":response});
        }
        
  });
 
}


// showclix login
exports.showclix_login = function(req,res){
 //var https = require('https'); 
 request.post({
        "rejectUnauthorized": false,
        headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                   "Accept": "application/json"},
        url:     'https://admin.showclix.com/api/registration',
        form:    {"email":"manojks@smartdatainc.net","password":"manojks@2015"},
        json: true}, function(error, response, body){
        if(error){
          console.log(error);
         res.json({"body":"","response":"",code:101});  
        }
        else{
        console.log(response.body);
        res.json({"body":body,"response":response});
        }
        
    });
 
}

// showclix login
exports.signup_seller = function(req,res){
 console.log(req.body);
 var input = { organization: req.body.organization,
  phone: req.body.phone,
  email: req.body.email,
  city: req.body.city,
  state: req.body.state,
  first_name: req.body.first_name,
  last_name: req.body.last_name,
  //password: '12345678'
  }
  console.log(input);
  request.post({
        headers: {"X-API-Token":"1c505644137e5496d38bd84fd1e2e714f4cea88b0cc161967bd77059cf861bf3"},
        url:     'http://api.showclix.com/Seller',
        form:    input }, function(error, response, body){
        if(error){
          console.log(error);
         res.json({"body":"","response":"",code:101});  
        }
        else{
        //console.log(response.statusCode);
        //console.log(response.headers);
        if (response.statusCode != 400 && response.statusCode != 401) {
         res.json({"body":body,"response":response,"code":200});
        }
        else{
         res.json({"body":body,"response":response,"code":101}); 
        }
        
        }
        
  });
 
}


/** 
Method: getData
Description:Function for fetching the data for My account page 
Created : 2016-05-09
Created By: Ashish dev swami  
*/
exports.getData = function(req,res){
 
   if (req.body.userId != "" && req.body.userId != "undefined") {
    connection.query('SELECT * from users where id='+req.body.userId, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     else{
     res.json({result:results,code:200});
     }
  });
  }
  else{
    res.json({error:"error",code:101});
  }
  
 
}

/** 
Method: updateUser
Description:Function for updating the user tab information My account page 
Created : 2016-05-09
Created By: Ashish dev swami  
*/
exports.updateUser = function(req,res) {
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', timezone='"+req.body.timezone+"', phone_no='"+req.body.phone_no+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    res.json({error:"error",code:101}); 
  }
}

/** 
Method: updateSocial
Description:Function for updating the social links tab information for My account page 
Created : 2016-05-10
Created By: Ashish dev swami  
*/
exports.updateSocial = function(req,res) {
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET facebook_link='"+req.body.facebook_link+"', twitter_link='"+req.body.twitter_link+"', google_plus='"+req.body.google_plus+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    res.json({error:"error",code:101}); 
  }
}

/*
//Commented till web services dependent function created for my account
exports.updateEmail = function(req,res) {
  console.log(req.body);
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.fname+"', last_name='"+req.body.lname+"', timezone='"+req.body.userzone+"', phone_no='"+req.body.phone+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    console.log(query);
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    console.log(query);
    res.json({error:"error",code:101}); 
  }
}

exports.updatePassword = function(req,res) {
  //console.log(req.body);
  if (req.body.user_id && req.body.user_id !="" && req.body.user_id != undefined) {
    var query = "UPDATE `users` SET first_name='"+req.body.fname+"', last_name='"+req.body.lname+"', timezone='"+req.body.userzone+"', phone_no='"+req.body.phone+"', fax='"+req.body.fax+"' where id="+req.body.user_id;
  }
  
  if (query != "") {
    //console.log(query);
    connection.query(query, function(err7, results) {
      if (err7) {
       res.json({error:err7,code:101});
      }
      res.json({result:results,code:200});
    });
  } else {
    //console.log(query);
    res.json({error:"error",code:101}); 
  }
}
*/
