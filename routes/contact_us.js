module.exports = function(app, express) {

  	var router = express.Router();
    contact  = require('./../app/contact_us/controllers/contact_us.js');

     router.post('/submitContact', contact.submitContact);

    app.use('/contact', router);
}