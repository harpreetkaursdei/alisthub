

var showClix   = require('./../../constant.js');
var request    = require('request');
var http       = require('http');
module.exports = function()
{
    
  this.getSalesData = function(req,res,next)
  {
    console.log(req);
    request.get({
                headers: {'Content-Type':'application/json','X-API-Token':'5ff1feef27162249399c7945252d2e675edfdd4523b1260169279ff61f62f412'}, //{'X-API-Token':req.showclix_token},
                url:     "https://api.showclix.com/Sale/search?end_date=" + req.end_date + " &start_date="+ req.start_date,
                form:    {} }, function(error, response, body){
                  //console.log("====================");
                  //console.log(error);
                  //console.log(response.body);
                  //console.log("====================");
                  //console.log(response.statusCode);
                  //console.log("====================");
                  //console.log(body);
                  if(response.statusCode == 200){
                  return next({status:1,data:response.body});
                }
                else{
                  return next({status:0,data:""});
                }
    });
  }
 

}
