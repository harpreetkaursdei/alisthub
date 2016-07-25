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

    /* get event sales data from showclix */
    router.post('/getEventSaleData' , profileCon.getEventSaleData);

    /* To get data of the all  events */
  	router.post('/getReportEvent',profileCon.getReportEvent);
    
    /* Default */   
    app.use('/report', router);
}
