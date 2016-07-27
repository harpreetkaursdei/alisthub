var moment     = require('moment-timezone');
var nodemailer = require('nodemailer');
var ip = require('ip');

exports.submitContact = function(req,res){
 //console.log(smtpTransport.options);
var curtime = moment().format('YYYY-MM-DD HH:mm:ss');     
req.body.created = curtime;
var smtpTransport = nodemailer.createTransport("SMTP",{
service: "Gmail",
auth: {
user: "osgroup.sdei@gmail.com",
pass: "mohali2378"
}

});  

exports.smtpTransport = smtpTransport;

  var mail = {
    from: "alisthub <pr@alistcalendar.com>",
    to: req.body.email,
    subject:req.body.subject,
    text: req.body.message,
    html: req.body.message
  }
console.log(req.connection);
  var ip = req.connection.remoteAddress;
 console.log(ip);

  var query = "INSERT INTO `enquiry` (`id`,`seller_id`,`name`,`email`,`subject`,`message`,`ip`,`created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.name+"', '"+req.body.email+"', '"+req.body.subject+"', '"+req.body.message+"','"+ip+"','"+curtime+"')";
  console.log(query);
  if (query != "") {
    connection.query(query, function(err7, results) {
      if (err7) {
       return  res.json({error:err7,code:101});
      }
      smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
     }); 
    smtpTransport.close();
     return  res.json({result:results,code:200});
    });
    
  } else {
      return res.json({error:"error",code:101}); 
  }
}
exports.stay_connected=function(req,res)
{
  var curtime = moment().format('YYYY-MM-DD HH:mm:ss'); 
  var ticketing="ticketing";
  req.body.network=ticketing;    
req.body.created = curtime;
var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

var query="INSERT INTO `stay_connected` (`id`,`email`, `ip`,`network`,`created`) VALUES (NULL, '"+req.body.email+"','" +ip+"','"+ticketing+"','"+curtime+"')";
console.log(query);
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
