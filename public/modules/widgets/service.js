'use strict';

angular.module('alisthub').factory('widget', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
    var url = {};


     url.savewidget = function(jsondata,callback){
       communicationService.resultViaPost(webservices.savewidget,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };

  url.saveEventWidgets = function(jsondata,callback){
       communicationService.resultViaPost(webservices.saveEventWidgets,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };

   url.getWidgetEvents = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getWidgetEvents,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };

    url.editEvent_widgets = function(jsondata,callback){
       communicationService.resultViaPost(webservices.editEvent_widgets,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
      
  };



    url.getWidget = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getWidget,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };


  
    url.getWidgetDetail = function(jsondata,callback){
       communicationService.resultViaPost(webservices.getWidgetDetail,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
			callback(res.data);
		});
      
  };


  
return url;

}]);