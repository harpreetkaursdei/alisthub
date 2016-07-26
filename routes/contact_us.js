module.exports = function(app, express) {

  	var router = express.Router();
    contact  = require('./../app/contact_us/controllers/contact_us.js');

     router.post('/submitContact', contact.submitContact);
     router.post('/stay_connected', contact.stay_connected);

    app.use('/contact', router);
}