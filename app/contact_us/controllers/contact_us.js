var moment     = require('moment-timezone');
var nodemailer = require('nodemailer');

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
  var query = "INSERT INTO `enquiry` (`id`,`seller_id`,`name`,`email`,`subject`,`message`,`created`) VALUES (NULL, '"+req.body.seller_id+"', '"+req.body.name+"', '"+req.body.email+"', '"+req.body.subject+"', '"+req.body.message+"','"+curtime+"')";
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