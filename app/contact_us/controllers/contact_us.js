var moment     = require('moment-timezone');


exports.submitContact = function(req,res){
	  var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
  req.body.created = curtime;
 
  var query = "INSERT INTO `inquiry` (`id`,`seller_id`,`name`,`email`,`subject`,`message`,`created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.name+"', '"+req.body.email+"', '"+req.body.subject+"', '"+req.body.message+"','"+curtime+"')";   

  if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       return  res.json({error:err7,code:101});
      }
     return  res.json({result:results,code:200});
    });

  } else {
      return res.json({error:"error",code:101}); 
  }
}