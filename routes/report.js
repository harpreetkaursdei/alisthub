/** 
Routes defnition for report Module
Created : 2016-05-09
Created By: Deppak khokkar
Module : report
*/

module.exports = function(app, express) {
	var router = express.Router();
      //Series    = require('./../app/series/controller/series.js');

	var profileCon   = require('./../app/report/controllers/report.js');
        
    /* Update my account user data */
    router.post('/getSalesData' , profileCon.getSalesData);
    
    /* Default */   
    app.use('/report', router);
}
