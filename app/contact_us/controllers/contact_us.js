var moment = require('moment-timezone');
var nodemailer = require('nodemailer');
var os = require('os');
exports.submitContact = function(req, res) {
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    req.body.created = curtime;
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        console.log(ifname);
        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                var ip = ifname = iface.address;
            }
            ++alias;
            var smtpTransport = nodemailer.createTransport("SMTP", {
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
                subject: req.body.subject,
                text: req.body.message,
                html: req.body.message
            }
            var query = "INSERT INTO `enquiry` (`id`,`seller_id`,`name`,`email`,`subject`,`message`,`ip`,`created`) VALUES (NULL, '" + req.body.seller_id + "', '" + req.body.name + "', '" + req.body.email + "', '" + req.body.subject + "', '" + req.body.message + "','" + ip + "','" + curtime + "')";
            connection.query(query, function(err7, results) {
                if (err7) {
                    return res.json({ error: err7, code: 101 });
                }
                smtpTransport.sendMail(mail, function(error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Message sent: " + response.message);
                    }
                });
                smtpTransport.close();
                return res.json({ result: results, code: 200 });
            });

        });
    });
}
exports.stay_connected = function(req, res) {
    var curtime = moment().format('YYYY-MM-DD HH:mm:ss');
    var ticketing = "ticketing";
    req.body.network = ticketing;
    req.body.created = curtime;

    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function(ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function(iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                var ip = ifname = iface.address;
            }
            ++alias;
            var query = "INSERT INTO `stay_connected` (`id`,`email`, `ip`,`network`,`created`) VALUES (NULL, '" + req.body.email + "','" + ip + "','" + ticketing + "','" + curtime + "')";
            connection.query(query, function(err7, results) {
                if (err7) {
                    return res.json({ error: err7, code: 101 });
                }
                return res.json({ result: results, code: 200 });
            });

        })
    });

}

