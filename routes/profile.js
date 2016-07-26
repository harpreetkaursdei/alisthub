/** 
Routes defnition for Event Setting Module
Created : 2016-05-09
Created By: Ashish Dev Swami 
Module : My Account 
*/

module.exports = function(app, express) {
	var router = express.Router();

    profileCon     = require('./../app/user/controllers/profile.js');
        
    /* Update my account user data */
    router.post('/updateUser', profileCon.updateUser);
    
    /* Update my account social data */
    router.post('/updateSocial', profileCon.updateSocial);
    
    /* My account data fetch */
    router.post('/getData', profileCon.getData);
    
    //showclix login
    router.post('/showclix_login', profileCon.showclix_login);
    
    //showclix signup_seller
    router.post('/signup_seller', profileCon.signup_seller);
    
    
    router.post('/validate_captcha', profileCon.validate_captcha);
    
    
    /* Default */   
    app.use('/profile', router);
}
