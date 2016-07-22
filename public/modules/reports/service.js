'use strict';
angular.module('alisthub').factory('report', ['$q', '$timeout','communicationService', function Customers($q, $timeout,communicationService) {
  var url = {};
  url.getSalesData = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.getSalesData,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req){
      callback(res.data);
    });
  };
  
  //get events 
  url.getReportEvent = function(jsondata,callback) {
    communicationService.resultViaPost(webservices.getReportEvent,appConstants.authorizationKey,headerConstants.json,jsondata, function(res,req) {
      callback(res.data);
    });
  };

  return url;
}]);