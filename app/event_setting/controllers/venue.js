/** 
Controller for the vanue managment  
Created : 2016-04-23
Created By: Mnoj kumar  
Module : manage venues
*/
var fs         = require('fs');
var moment     = require('moment-timezone');
var path_venue = process.cwd()+'/public/images/venues/';
var request    = require('request');
//var showClix   = require('./../../../constant.js');
var showClix   = require('./../../showclix/service.js');

/** 
Method: getSettingCount
Description:Function to get the setting count for the seller 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.getSettingCount = function(req,res){
  connection.query('SELECT count(*) as count from venues where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err, vresults) {
   if (err) {
    res.json({error:err,code:101});
   }
   connection.query('SELECT count(*) as count from questions where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err2, qresults) {
     connection.query('SELECT count(*) as count from products where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err2, presults) {
          connection.query('SELECT count(*) as count from discounts where seller_id='+req.body.userId+ ' ORDER BY created DESC', function(err2, dresults) {
            console.log({venueresult:vresults[0],quesresult:qresults[0],productresult:presults[0],discountresult:dresults[0],code:200});
     res.json({venueresult:vresults[0],quesresult:qresults[0],productresult:presults[0],discountresult:dresults[0],code:200});
          });
     });
   });
  });
}

/** 
Method: getVenue
Description:Function to get the venue of seller 
Created : 2016-04-19
Created By: Manoj kumar  
*/

exports.getVenue = function(req,res){
  if (req.body.type && req.body.type !== undefined && req.body.type != "" && req.body.type == 1) {
    var query = 'SELECT * from venues where seller_id='+req.body.userId+' AND status=1 ORDER BY created DESC';
  }else{
    var query = 'SELECT * from venues where seller_id='+req.body.userId+'  ORDER BY created DESC';     
  }
  connection.query(query, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
  
}

/** 
Method: addVenue
Description:Function to add the venue of seller 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.addVenue = function(req,res) {
     //console.log(req.body);
    function update_showclix_data(event_url,id,data)
    {
        var showclix_venue_id = event_url.split("/");
        var query = "UPDATE venues SET showclix_venue_id="+showclix_venue_id[4]+", showclix_venue_url='"+event_url+"', showclix_seller='"+data.showclix_seller_id+"' where id="+id;
        connection.query(query, function(err7, responce) {
        })
    }
     
     if (req.body.venue_name != "" && req.body.venue_name != "undefined" && req.body.address != "" && req.body.address != "undefined" && req.body.city != "" && req.body.city != "undefined")
     {
          var photoname =  chartname = "";
          if(req.body.timezone == undefined) { req.body.timezone = ''; }
          if(req.body.capacity == undefined) { req.body.capacity = ''; }
          if(req.body.contact_name == undefined) { req.body.contact_name = ''; }
          if(req.body.phone == undefined) { req.body.phone = ''; }
          if(req.body.fax == undefined) { req.body.fax = ''; }
          if(req.body.email == undefined) { req.body.email = ''; }
          if(req.body.url == undefined) { req.body.url = ''; }
          
          if (req.body.imagedata && req.body.imagedata != "" && req.body.imagedata != undefined) {
             var photoname = req.body.seller_id+'_image_'+Date.now() + '.jpg';
             var imagename = path_venue+'/'+photoname;
             var base64Data = req.body.imagedata.replace(/^data:image\/jpeg;base64,/, "");
             
             fs.writeFile(imagename, base64Data, 'base64', function(err) {
             if (err) {
              console.log("Image Failure Upload");
             }
              console.log("Chart Upload");
             });
             req.body.image = photoname;
          }
          
          if (req.body.venue_chart && req.body.venue_chart != "" && req.body.venue_chart != undefined)
          {
               var chartname   = req.body.seller_id+'_chart_'+Date.now() + '.jpg';
               var chartimage  = path_venue+'/'+chartname;
               var base64Data5 = req.body.venue_chart.replace(/^data:image\/jpeg;base64,/, "");
               
               fs.writeFile(chartimage, base64Data5, 'base64', function(err5) {
                if (err5) {
                console.log("Chart Failure Upload");
               }
                console.log("Image Upload");
               });
               req.body.seating_chart = chartname;
          }
          
               if (req.body.id && req.body.id !="" && req.body.id !== undefined) {
                 var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
                 req.body.modified = curtime;      
                 var query = "UPDATE `venues` SET seller_id="+req.body.seller_id+", venue_type='"+req.body.venue_type+"', venue_name='"+req.body.venue_name+"', address='"+req.body.address+"', city='"+req.body.city+"', zipcode='"+req.body.zipcode+"', state='"+req.body.state+"', country='"+req.body.country+"', status='"+req.body.status+"', latitude='"+req.body.latitude+"', longitude='"+req.body.longitude+"', modified='"+req.body.modified+"', fax='"+req.body.fax+"', timezone='"+req.body.timezone+"', capacity='"+req.body.capacity+"', contact_name='"+req.body.contact_name+"', phone='"+req.body.phone+"', email='"+req.body.email+"', url='"+req.body.url+"', image='"+req.body.image+"', seating_chart='"+req.body.seating_chart+"' where id="+req.body.id;
               }
               else
               {
                 var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
                 req.body.created = curtime;      
                 var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.venue_type+"', '"+req.body.venue_name+"', '"+req.body.address+"', '"+req.body.city+"', '"+req.body.zipcode+"', '"+req.body.state+"', '"+req.body.country+"', '1', '"+req.body.latitude+"', '"+req.body.longitude+"', '"+req.body.created+"', '"+req.body.fax+"', '"+req.body.timezone+"', '"+req.body.capacity+"', '"+req.body.contact_name+"', '"+req.body.phone+"', '"+req.body.email+"', '"+req.body.url+"', '"+req.body.image+"', '"+req.body.seating_chart+"')";
               }
     
               if (query != "")
               {
                   console.log(query);
                   connection.query(query, function(err7, results) {
                       if (err7) {
                         res.json({error:err7,code:101});
                       }
                      ////////////////////// SHOWCLIX API /////////////////////////////
                      var showClix2 = new showClix();
                         showClix2.add_venue(req,res,function(data){
                                                     
                           if (req.body.id && req.body.id !="" && req.body.id !== undefined) {
                           var parent = req.body.id;
                           }
                           else{
                            var parent    = results.insertId;
                            var event_url = data.location;
                            update_showclix_data(event_url,parent,data);
                           }
                           if (data.status == 1) {
                            res.json({result:results,showclix:data.location,code:200});
                           }
                           else
                           {
                             if (req.body.id && req.body.id !="" && req.body.id !== undefined) {
                             }else{
                              var delquery = "Delete from venues where id="+results.insertId;
                              connection.query(delquery, function(err7, rollback) {
                              
                              })
                             }
                              
                              res.json({error:"error",code:104});
                                           
                         }
                      })
                    ////////////////////// SHOWCLIX API/////////////////////////////
                       
                       
                   });
               } else {
                   res.json({error:"error",code:101}); 
               }
          
     } // validation
     else{
          res.json({error:"error",code:101}); 
     }
}

/** 
Method: venueOverview
Description:Function to venue Overview page 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.venueOverview = function(req,res){
  connection.query('SELECT * from venues where id='+req.body.id, function(err, results) {
     if (err) {
      res.json({error:err,code:101});
     }
     res.json({result:results,code:200});
  });
}

/** 
Method: changeVenueStatus
Description:Function to change venue status 
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.changeVenueStatus = function(req,res) {
  connection.query("UPDATE venues SET status='"+req.body.status+"' where id="+req.body.id, function(err, results) {
    if (err) {
      res.json({error:err,code:101});
    }
    res.json({result:results,code:200});
  });
}

/** 
Method: deleteVenue
Description:Function to delete venue  
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.deleteVenue = function(req,res){
    //console.log(req.body.userId);
   connection.query("Delete from venues where id="+req.body.id, function(err, results) {
   if (err) {
    res.json({error:err,code:101});
   }
   res.json({result:results,code:200});
});
   
}

/** 
Method: duplicateVenue
Description:Function to duplicate venue  
Created : 2016-04-19
Created By: Manoj kumar  
*/
exports.duplicateVenue = function(req,res){
    //console.log(req.body.userId);
  connection.query("select * from venues where id="+req.body.id, function(err, vdata) {
     if (err) {
      res.json({error:err,code:101});
     }
    
     var data = vdata[0];
    
     var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
     data.created = curtime; 
     var query = "INSERT INTO `venues` (`id`, `seller_id`, `venue_type`, `venue_name`, `address`, `city`, `zipcode`, `state`, `country`, `status`, `latitude`, `longitude`, `created`, `fax`, `timezone`, `capacity`, `contact_name`, `phone`, `email`, `url`, `image`, `seating_chart`) VALUES (NULL, '"+data.seller_id+"', '"+data.venue_type+"', '"+data.venue_name+"', '"+data.address+"', '"+data.city+"', '"+data.zipcode+"', '"+data.state+"', '"+data.country+"', '"+data.status+"', '"+data.latitude+"', '"+data.longitude+"', '"+data.created+"', '"+data.fax+"', '"+data.timezone+"', '"+data.capacity+"', '"+data.contact_name+"', '"+data.phone+"', '"+data.email+"', '"+data.url+"', '"+data.image+"', '"+data.seating_chart+"')";
      
       /// To save Venue details
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
  });
}
