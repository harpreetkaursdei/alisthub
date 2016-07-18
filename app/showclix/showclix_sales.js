

var showClix   = require('./../../constant.js');
var request    = require('request');
var http       = require('http');
module.exports = function()
{
    
  this.getSalesData = function(req,res,next)
  {

    request.get({
                headers: {"content-type": "application/json",'X-API-Token':req.showclix_token}, //{'X-API-Token':req.showclix_token},
                url:     "https://api.showclix.com/Sale/search",
                form:    {} }, function(error, response, body){
                  console.log("====================");
                  console.log(response.headers);
                  console.log("====================");
                  console.log(response.body);
                  console.log("====================");
                  return next({status:1,data:response.body});
    });
  }
 

}
