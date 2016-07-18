

var showClix   = require('./../../constant.js');
var request    = require('request');
var http       = require('http');
module.exports = function()
{
    
  this.getSalesData = function(req,res,next)
  {
    console.log(req);
    request.get({
                headers: {'X-API-Token':req.showclix_token}, //{'X-API-Token':req.showclix_token},
                url:     "https://api.showclix.com/Sale/search",
                form:    {} }, function(error, response, body){
                  console.log("====================");
                  console.log(error);
                  console.log(response.body);
                  console.log("====================");
                  console.log(response.statusCode);
                  console.log("====================");
                  console.log(body);
                  return next({status:1,data:response.body});
    });
  }
 

}
