/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('reportController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams,$http) { 
    $rootScope.loader_div = false;

    
    

 // Datepicker stuff
  var now = new Date();
  if (now.getMonth() === 11) {
    var current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
    var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',

    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return '';
  }

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };
  
  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.open3 = function() {
    $scope.popup3.opened = true;
  };
  
  $scope.open4 = function() {
    $scope.popup4.opened = true;
  };
  
  $scope.open5 = function() {
    $scope.popup5.opened = true;
  };
  
  $scope.open6 = function() {
    $scope.popup6.opened = true;
  };
  
  $scope.popup1 = {
    opened: false
  };
  
  $scope.popup2 = {
    opened: false
  };
  
  $scope.popup3 = {
    opened: false
  };
  
  $scope.popup4 = {
    opened: false
  };
  ////
  $scope.popup5 = {
    opened: false
  };

  $scope.popup6 = {
    opened: false
  };


  // Called when the editor is completely ready.
  $scope.onReady = function() {
  
  };
 
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  $scope.options1 = {
    customClass: getDayClass,
    initDate: new Date(),
    showWeeks: false
  };
  $scope.options3 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };
  $scope.options4 = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date(tomorrow);
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [{
    date: tomorrow,
    status: 'full'
  }, {
    date: afterTomorrow,
    status: 'partially'
  }];

  function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
  // Datepicker end


    
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
    var reportService = $injector.get("report");

    $scope.getChart = function(days,todayDate,endDate,type,selection) {

      $scope.daysShow = days + " days";
      if(days==1) {
        $scope.daysShow = "24 hours";  
      }

      $rootScope.loader_div = false;

      if(selection=='manual') {
        var manualStartDate = formatsearchDate(new Date(todayDate).setDate(new Date(todayDate).getDate()));
        var manualEndDate = formatsearchDate(new Date(endDate).setDate(new Date(endDate).getDate()));
      } else {
        var manualStartDate = formatsearchDate(new Date(todayDate).setDate(new Date(todayDate).getDate() - (150+parseInt(days))));
        var manualEndDate = formatsearchDate(new Date().setDate(new Date().getDate()-150));
      }
      
      $scope.salesData = {};
      $scope.salesData.start_date = manualStartDate;
      $scope.salesData.end_date = manualEndDate;
      console.log("salesData: " + $scope.salesData.start_date);
      console.log("salesData: " + $scope.salesData.end_date);

      //$scope.salesData.showclix_token     = $localStorage.showclix_token;
      //$scope.salesData.showclix_seller_id = $localStorage.showclix_seller_id;
      $scope.salesData.showclix_user_id = $localStorage.showclix_user_id;
      $scope.salesData.showclix_token = '5ff1feef27162249399c7945252d2e675edfdd4523b1260169279ff61f62f412';
      $scope.salesData.showclix_seller_id = 22214;
      //console.log("showclix_seller_id: " + $localStorage.showclix_seller_id);

      reportService.getSalesData($scope.salesData,function(response) {
        if (response!=null) {
          $rootScope.loader_div = true;
          $scope.showClixDataObj = [];

          //if (response.code == 200 && response.data=='') {
          if (response.code == 200 && response.data!='') {
            $scope.showClixDataObj.push(JSON.parse(response.data)); 
            console.log("showClixDataObj: " + $scope.showClixDataObj);
            
            $scope.chartDataRevenue = [];
            $scope.chartDataTicket = [];

            $scope.colors = [];
            $scope.labels = [];

            for(var i = 150+days; i > 150; i--) {
              var setdate = i; 
              var setdate = formatDateGraph(new Date(todayDate).setDate(new Date(todayDate).getDate() - i));
              var dataForDate = getObjects(graphData, 'date', setdate);
              var dateTotalTicketRevenue = 0;
              var dateTotalTicketTicket = 0;
              for(var keyDate in dataForDate) {
                console.log("dataForDate: " + dataForDate[keyDate]);
                dateTotalTicketRevenue = dateTotalTicketRevenue + parseFloat(dataForDate[keyDate].total_cost);
                dateTotalTicketTicket = dateTotalTicketTicket + parseInt(dataForDate[keyDate].tickets);
              }
               
              $scope.labels.push(graphDate(setdate));
              
              $scope.chartDataRevenue.push(dateTotalTicketRevenue);
              $scope.chartDataTicket.push(dateTotalTicketTicket);

              if(type=='sold') {
                $scope.series = ['Tickets Sold'];  
                $scope.colors.push('#0275d0');  
                $scope.chartData=[$scope.chartDataTicket];
              }
              
              if(type=='revenue') {
                $scope.series = ['Tickets Revenue ($)'];
                $scope.colors.push('#c129b9');    
                $scope.chartData=[$scope.chartDataRevenue];
              }

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
    }

    //console.log("formatDateGraph: " + formatDateGraph(new Date('2015-10-01').setDate(new Date('2015-10-01').getDate() - 1)));
    //console.log("today date: " + formatDateGraph(new Date()));
    $scope.datetype = 'Last 30 days';
    
    $scope.$watch('datetype',function() {
      $scope.showdatereports =false;
      var gettype = $scope.datetype;
      var todayDate = formatDateGraph(new Date());
      
      if(gettype == "Today") {
       $scope.getChart(1,todayDate,todayDate,$scope.graphType.typevalue,'auto');
      } else if(gettype == "Last 7 days") {
       $scope.getChart(7,todayDate,todayDate,$scope.graphType.typevalue,'auto');
      } else if(gettype == "Last 14 days") {
       $scope.getChart(14,todayDate,todayDate,$scope.graphType.typevalue,'auto');
      } else if(gettype == "Last 30 days") {
       $scope.getChart(30,todayDate,todayDate,$scope.graphType.typevalue,'auto');
      } else if(gettype == "Custom") {
        $scope.showdatereports =true;
      } else {
        $scope.getChart(30,todayDate,todayDate,$scope.graphType.typevalue,'auto');
      }
    });

    $scope.$watch('graphType',function() {
        var todayDate = formatDateGraph(new Date());
        $scope.getChart(30,todayDate,todayDate,$scope.graphType.typevalue,'auto');
    });

    $scope.grphsTypes = [
        {type : "Ticket Sold", typevalue : "sold"},
        {type : "Tickets Revenue", typevalue : "revenue"},
        {type : "Conversion Rate", typevalue : "conversion"}
    ];

    var todayDate1 = formatDateGraph(new Date());
    $scope.getChart(30,todayDate1,todayDate1,'sold','auto');
    
    $scope.customsearchdata = function() {
        if($scope.startdate!=undefined) {
            var customStartdate = $scope.startdate;
            var startdate = ('0' + (customStartdate.getDate())).slice(-2);
            var startyear = customStartdate.getFullYear();
            var startmonth = ('0' + (customStartdate.getMonth()+1)).slice(-2);
            var convertedStartDate = startyear +"-"+ startmonth +"-"+ startdate;
        }

        if($scope.enddate!=undefined) {
            var customEnddate = $scope.enddate;
            var enddate = ('0' + (customEnddate.getDate())).slice(-2);
            var endyear = customEnddate.getFullYear();
            var endmonth = ('0' + (customEnddate.getMonth()+1)).slice(-2);
            var convertedEndDate = endyear +"-"+ endmonth +"-"+ enddate;
        }

        //$scope.enddate = formatonlyDate($scope.enddate);
        if($scope.startdate!=undefined && $scope.enddate!=undefined) {
            console.log(convertedStartDate + "----" + convertedEndDate);
            //$scope.getChart(10,convertedStartDate,convertedEndDate,$scope.graphType.typevalue,'manual');
        }
    }

    if(window.innerWidth>767) { 
      $scope.navCollapsed = false;    
    } else {
      $scope.navCollapsed = true;
      $scope.toggleMenu = function() {
        $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
      };    
    }

   if (!$localStorage.isuserloggedIn) {
      $state.go('login');
   }
})
