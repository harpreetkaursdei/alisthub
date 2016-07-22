/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('eventhomeController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams,$http) { 
    $rootScope.loader_div = false;

    
 

    
    function formatsearchDate(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var dd = today.getDate();
        if(dd<10){ dd='0'+dd; }
        var month = parseInt(today.getMonth())+1;        
        if(month<10){  month='0'+month; } 
        return today.getFullYear()+ ":" + month + ":" + dd + " 00:00:00";
    }

    function formatDateGraph(convertdate) {
        if(convertdate != '' && convertdate != undefined)
            var today = new Date(convertdate);
        else 
            var today = new Date();

        var dd = today.getDate();
        if(dd<10){ dd='0'+dd; }
        var month = parseInt(today.getMonth())+1;        
        if(month<10){  month='0'+month; } 
        return today.getFullYear()+ "-" + month + "-" + dd;
    }
    
    function graphDate(convertdate) {
      var today = new Date(convertdate);     
      var dd = today.getDate();
      if(dd<10){ dd='0'+dd; }
      var month = parseInt(today.getMonth());   
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return  dd + " " + monthNames[month];
    }

   
    function getObjects(obj, key, val) {
      var objects = [];
      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] === 'object') {
          objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i === key && getDateTime(obj[key]) === val) {
          objects.push(obj);
        }
      }
      return objects;
    }

    function getDateTime(openDate) {
      var date1 = new Date(openDate.slice(0,10));
      if(date1!="Invalid Date" && openDate!=null) {
        var date = ('0' + (date1.getDate())).slice(-2);
        var year = date1.getFullYear();
        var month = ('0' + (date1.getMonth()+1)).slice(-2);
        //console.log(date+"--"+year+"--"+month);
        //var convertedDate = {};
        var convertedDate = year+"-"+month+"-"+date;
        return convertedDate ;  
      } else {
        var convertedDate = null;
        return convertedDate ;
      }
    };
    

    //$scope.labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    
    $rootScope.class_status=false;
    var eventService = $injector.get("events");
    var packageService = $injector.get("event_package");

    $scope.getChart = function(days) {

      $scope.daysShow = days + " days";
      if(days==1){
        $scope.daysShow = "24 hours";  
      }

      $rootScope.loader_div = false;
      var manualStartDate = formatsearchDate(new Date().setDate(new Date().getDate() - (150+parseInt(days))));
      var manualEndDate = formatsearchDate(new Date().setDate(new Date().getDate() - 150));
      
      $scope.salesData = {};
      $scope.salesData.start_date = manualStartDate;
      $scope.salesData.end_date = manualEndDate;
      //console.log($scope.salesData);

      //$scope.salesData.showclix_token     = $localStorage.showclix_token;
      //$scope.salesData.showclix_seller_id = $localStorage.showclix_seller_id;
      $scope.salesData.showclix_user_id = $localStorage.showclix_user_id;
      $scope.salesData.showclix_token = '5ff1feef27162249399c7945252d2e675edfdd4523b1260169279ff61f62f412';
      $scope.salesData.showclix_seller_id = 22214;
      console.log("showclix_seller_id: " + $localStorage.showclix_seller_id);

      eventService.getSalesData($scope.salesData,function(response) {
        if (response!=null) {
          $rootScope.loader_div = true;
          $scope.showClixDataObj = [];
          if (response.code == 200 && response.data!='') {
            $scope.showClixDataObj.push(JSON.parse(response.data));
            //console.log("showClixDataObj: " + $scope.showClixDataObj);
            
            $scope.chartDataRevenue = [];
            $scope.chartDataTicket = [];
            $scope.series = ['Tickets Revenue','Tickets Sold'];
            $scope.colors = [];
            $scope.labels = [];

            for(var i = 165+days; i > 165; i--) {
              var setdate = i; 
              var setdate = formatDateGraph(new Date().setDate(new Date().getDate() - i));
              var dataForDate = getObjects(graphData, 'date', setdate);
              var dateTotalTicketRevenue = 0;
              var dateTotalTicketTicket = 0;
              for(var keyDate in dataForDate) {
                console.log("dataForDate: " + dataForDate[keyDate]);
                dateTotalTicketRevenue = dateTotalTicketRevenue + parseFloat(dataForDate[keyDate].total_cost);
                dateTotalTicketTicket = dateTotalTicketTicket + parseInt(dataForDate[keyDate].tickets);
              }
               
              $scope.labels.push(graphDate(setdate));
              $scope.colors.push('#c129b9','#0275d0');
              $scope.chartDataRevenue.push(dateTotalTicketRevenue);
              $scope.chartDataTicket.push(dateTotalTicketTicket);

              $scope.chartData=[$scope.chartDataRevenue,$scope.chartDataTicket];

              var graphData = $scope.showClixDataObj[0];
              $scope.totalTicketSold = 0;
              $scope.totalTicketRevenue = 0;
              for(var key in graphData) {
                $scope.totalTicketSold = $scope.totalTicketSold + parseInt(graphData[key].tickets);
                $scope.totalTicketRevenue = $scope.totalTicketRevenue + parseFloat(graphData[key].total_cost);
              }

            }
          }
        }
      });
      //console.log($scope.labels);
    }

    $scope.getChart(30);
   
    if(window.innerWidth>767) { 
      $scope.navCollapsed = false;    
    } else {
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
      };    
    }

    // if seller has no event then
    if ($localStorage.userId) {
      $http({
        url: webservices.getEvents,
        method: 'POST',
        data: "user_id="+$localStorage.userId,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Accept": "application/json",
        }
      }).success(function(datae, status, headers, config) {
        if (datae && datae != "") {
        
        } else {
          $state.go('create_an_event'); 
        }
      });
    }
     
    $scope.UPCtab = false;
    $scope.UPCtabclass = "fa-caret-down";
    $scope.id1 = 1;
    $scope.openTabUPC = function(id) {
        if (id == 1) {
            $scope.id1 = 2;
            $scope.UPCtab = true;
            $scope.UPCtabclass = "fa-caret-up";
        }
        if (id == 2) {
            $scope.id1 = 1;
            $scope.UPCtab = false;
            $scope.UPCtabclass = "fa-caret-down";
        }
    }

    $scope.PASTtab = false;
    $scope.PASTtabclass = "fa-caret-down";
    $scope.id2 = 1;
    $scope.openTabPAST = function(id) {
        if (id == 1) {
            $scope.id2 = 2;
            $scope.PASTtab = true;
            $scope.PASTtabclass = "fa-caret-up";
        }
        if (id == 2) {
            $scope.id2 = 1;
            $scope.PASTtab = false;
            $scope.PASTtabclass = "fa-caret-down";
        }
    }

    $scope.PAKtab = false;
    $scope.PAKtabclass = "fa-caret-down";
    $scope.id3 = 1;
    $scope.openTabPAK = function(id) {
        if (id == 1) {
            $scope.id3 = 2;
            $scope.PAKtab = true;
            $scope.PAKtabclass = "fa-caret-up";
        }
        if (id == 2) {
            $scope.id3 = 1;
            $scope.PAKtab = false;
            $scope.PAKtabclass = "fa-caret-down";
        }
    }

    $scope.recurringHref = function(eventId,recurringOrNot) {
      if(recurringOrNot==0){
        $location.path("/create_event_step1/" + eventId);  
      } else {
        $location.path("/create_series_step1/" + eventId);
      }
    }


     

    //upcomming event list
    $scope.getUpcommingEvent = function(eventType) {
      type = 0;      
      if(eventType == 'series') {
        type = 1;
      }

      eventService.getUpcommingEvent({'user_id':$localStorage.userId,'type':type},function(response) {
        if (response!=null) {
          if (response.code == 200) {
            $scope.upcoming_event_data = response.results;
            $scope.tableParams = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: { name : 'asc' },
                                  },{
                                    counts: [], // hide page counts control
                                    total: 1,  // value less than count hide pagination 
                                    data:$scope.upcoming_event_data
                                  });
          }
        } else {
          $scope.upcoming_event_data = [];   
        }
      });
    }

    //PAST event list
    $scope.getPastEvent = function(eventType) {
      type = 0;      
      if(eventType == 'series') {
        type = 1;
      }
      eventService.getPastEvent({'user_id':$localStorage.userId,'type':type},function(response) {
        if (response!=null) {
          if (response.code == 200) {
            $scope.past_event_data = response.results;
            
            $scope.tableParams1 = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: { name : 'asc' },
                                  }, {
                                    counts: [], // hide page counts control
                                    total: 1,  // value less than count hide pagination 
                                    data:$scope.past_event_data
                                  });
          }
        } else {
          $scope.past_event_data = [];   
        }
      });
    }

    //PAST event list
    $scope.getEventSeries = function() {
      eventService.getEventSeries({'user_id':$localStorage.userId},function(response) {
        if (response!=null) {
          if (response.code == 200) {
            $scope.event_package_data = response.results;
            
            $scope.tableParams2 = new ngTableParams({
                                    page: 1,            // show first page
                                    count: 5,           // count per page
                                    sorting: { name : 'asc' },
                                  },{
                                    counts: [], // hide page counts control
                                    total: 1,  // value less than count hide pagination 
                                    data : $scope.event_package_data
                                  });
          }
        } else {
          $scope.event_package_data = [];   
        }
      });
    }


 $scope.viewOverviewHref = function(eventId,recurringOrNot) {
      if(recurringOrNot==0){
        $location.path("/single_event_overview/" + eventId);  
      } else {
        $location.path("/series_event_overview/" + eventId);
      }
    }
    
    $scope.getUpcommingEvent();
    $scope.getPastEvent();
    $scope.getEventSeries();


   


    $scope.delEvent=function(event_id)
    {
    
     eventService.deleteEvent({'event_id':event_id},function(response){
       if(response.code==200)
     {
     eventService.getEventUser({'user_id':$localStorage.userId},function(response){
              
              if (response!=null) {

              if (response.code == 200)
              {
                $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =response.results;
               $scope.tableParams = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 50,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data:$scope.upcoming_event_data
                              });
               $scope.tableParams1 = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 5,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data1:$scope.past_event_data
                              });
              $scope.tableParams2 = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 5,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data2:$scope.event_package_data
                              });
              }

              }else{
               $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =[];   
              }
              
          });
     }
     });
    }

    $scope.delPackage=function(package_id)
    {
      $scope.packageData = {};
      $scope.packageData.package_id = package_id;
      $scope.packageData.user_id = $localStorage.userId ;
      $scope.packageData.showclix_token     = $localStorage.showclix_token;
      $scope.packageData.showclix_user_id   = $localStorage.showclix_user_id;
      $scope.packageData.showclix_seller_id = $localStorage.showclix_seller_id;
 console.log($scope.packageData);

     packageService.delPackage($scope.packageData ,function(response){
       if(response.code==200)
     {
     eventService.getEventUser({'user_id':$localStorage.userId},function(response){
              
              if (response!=null) {

              if (response.code == 200)
              {
                $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =response.results;
               $scope.tableParams = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 50,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data:$scope.upcoming_event_data
                              });
               $scope.tableParams1 = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 5,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data1:$scope.past_event_data
                              });
              $scope.tableParams2 = new ngTableParams(
                              {
                                      page: 1,            // show first page
                                      count: 5,           // count per page
                                      sorting: {name:'asc'},
                                      
                              },
                              {
                                      data2:$scope.event_package_data
                              });
              }

              }else{
               $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data =[];   
              }
              
          });
     }
     });
    }



 
   if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
})
