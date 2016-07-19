/** 
Method: saveEvent
Description:Function to save event data for user 
Created : 2016-06-30
Created By: Manoj Kumar Singh
*/
var moment       = require('moment-timezone');
var showClix   = require('./../../showclix/showclix_sales.js');


exports.getSalesData = function(req,res) {
  var data=req.body;
  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
  // showclix start 
  var showClix2 = new showClix();
  showClix2.getSalesData(data,res,function(sdata){
    res.json({data:sdata.data,code:200});
  });
  //showclix end
}