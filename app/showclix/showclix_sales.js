

var showClix   = require('./../../constant.js');
var request    = require('request');
var http       = require('http');
module.exports = function()
{
    
  this.getSalesData = function(req,res,next)
  {
    console.log(req);

    var reportDataUrl = "https://api.showclix.com/Sale/search?seller = " + req.showclix_seller_id;

    if(req.end_date && req.start_date){
      reportDataUrl += "&end_date=" + req.end_date + " &start_date="+ req.start_date;     
    }

    //"https://api.showclix.com/Sale/search?end_date=" + req.end_date + " &start_date="+ req.start_date + " &seller="+ req.showclix_seller_id ;

    request.get({
                headers: {'Content-Type':'application/json','X-API-Token': req.showclix_token }, //{'X-API-Token':req.showclix_token},
                url: reportDataUrl,
                form: {} }, function(error, response, body) {
                  //console.log("====================");
                  //console.log(error);
                  //console.log(response.body);
                  //console.log("====================");
                  //console.log(response.statusCode);
                  //console.log("====================");
                  //console.log(body);
                  if(response.statusCode == 200) {
                  return next({status:1,data:response.body});
                } else {
                  return next({status:0,data:""});
                }
    });
  }
 

}
