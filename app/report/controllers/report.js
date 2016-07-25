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

/** 
Method: getReportEvent
Description:Function to get latest upcomming event data  
Created : 2016-06-20
Created By: Deepak khokkar  
*/
exports.getReportEvent=function(req,res) {
	var user_id = req.body.user_id;
	var curtime = moment().format('YYYY-MM-DD');
	var eventType = req.body.type;
	 
	var sql = "SELECT events.id, events.title, events.sub_title, events.recurring_or_not, events.image_name, events.start_date, events.end_date, events.event_location, events.city, events.event_address, events.website_url, events.description, events.short_description,showclix_id,showclix_seller,showclix_url FROM events LEFT JOIN event_dates ON events.id = event_dates.event_id where events.parent_id IS NULL and events.user_id=" + user_id + " and events.recurring_or_not = "+ eventType +" ORDER BY start_date ASC";
	  
	connection.query(sql,function(err,result) {
	    if (err) {
	      res.send({err:"error",code:101}); 
	    }
	    res.send({"results":result,code:200});  
	});
}