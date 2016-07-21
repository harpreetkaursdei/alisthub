/** 
Angular Events Home Controller
Created : 2016-04-05
Created By: Deepak Khokkar
Module : Events Home 
*/

angular.module('alisthub').controller('reportController', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location, $ocLazyLoad,$state,ngTableParams,$http) { 
    $rootScope.loader_div = false;

    $scope.showClixDataObj = [];
     $scope.showClixDataObj.push({
    "7277803": {
    "sale_id": "7277803",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "11859930",
    "transaction_id": "7929662467",
    "tickets": "1",
    "confirmation_number": "7868H91G16708348",
    "total_cost": "29.50",
    "buyer_fee": "4.50",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "2",
    "discount": "0.00",
    "cardnumber": "3291",
    "first_four": null,
    "date": "2016-01-27 18:24:34",
    "address": "22 Meadow Drive",
    "address_2": "",
    "city": "San Rafael",
    "state": "CA",
    "zip": "94903",
    "country": "US",
    "phone": "4155070579",
    "email": "sourcehealing@yahoo.com",
    "purchase_for": "Christine Hodil",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7278983": {
    "sale_id": "7278983",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "6696407",
    "transaction_id": "7929911115",
    "tickets": "2",
    "confirmation_number": "6U676F1U16711106",
    "total_cost": "59.00",
    "buyer_fee": "9.00",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "2",
    "discount": "0.00",
    "cardnumber": "3063",
    "first_four": null,
    "date": "2016-01-27 20:18:59",
    "address": "70 Temelec Cir",
    "address_2": "",
    "city": "Sonoma",
    "state": "CA",
    "zip": "95476",
    "country": "US",
    "phone": "9282030346",
    "email": "kbryant11@msn.com",
    "purchase_for": "Kathleen Bryant",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7279751": {
    "sale_id": "7279751",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "16809110",
    "transaction_id": "7930069019",
    "tickets": "1",
    "confirmation_number": "969ZZ9ZF16713223",
    "total_cost": "29.50",
    "buyer_fee": "4.50",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "4",
    "discount": "0.00",
    "cardnumber": "8372",
    "first_four": null,
    "date": "2016-01-27 21:51:18",
    "address": "260 Bolinas Road",
    "address_2": "",
    "city": "Fairfax",
    "state": "CA",
    "zip": "94930",
    "country": "US",
    "phone": "6195490416",
    "email": "dw_snyder@hotmail.com",
    "purchase_for": "David Snyder",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7284135": {
    "sale_id": "7284135",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "16819342",
    "transaction_id": "7931406073",
    "tickets": "1",
    "confirmation_number": "G1R687GY16723429",
    "total_cost": "29.50",
    "buyer_fee": "4.50",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "2",
    "discount": "0.00",
    "cardnumber": "3554",
    "first_four": null,
    "date": "2016-01-28 11:13:19",
    "address": "380 Pleasant Hill Rd.",
    "address_2": "",
    "city": "Sebastopol",
    "state": "CA",
    "zip": "95472",
    "country": "US",
    "phone": "7072490205",
    "email": "dkg@wishwellprod.com",
    "purchase_for": "Debra Giusti",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7286677": {
    "sale_id": "7286677",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "16824896",
    "transaction_id": "7932145093",
    "tickets": "4",
    "confirmation_number": "T5627FDY16728969",
    "total_cost": "120.00",
    "buyer_fee": "18.00",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "2.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "4",
    "discount": "0.00",
    "cardnumber": "5701",
    "first_four": null,
    "date": "2016-01-28 14:36:19",
    "address": "1335 Canyon Drive",
    "address_2": "",
    "city": "Petaluma",
    "state": "CA",
    "zip": "94952",
    "country": "US",
    "phone": "7079717947",
    "email": "liongoodman@gmail.com",
    "purchase_for": "Lion Goodman",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7313954": {
    "sale_id": "7313954",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "16885921",
    "transaction_id": "7938275016",
    "tickets": "1",
    "confirmation_number": "YD7D7T2D16789771",
    "total_cost": "27.50",
    "buyer_fee": "2.50",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "2",
    "discount": "0.00",
    "cardnumber": "1585",
    "first_four": null,
    "date": "2016-01-30 15:37:22",
    "address": "PO Box 768",
    "address_2": "",
    "city": "Woodacre",
    "state": "CA",
    "zip": "94973",
    "country": "US",
    "phone": "",
    "email": "julianapeartree@gmail.com",
    "purchase_for": "Juliana Birnbaum Traffas",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7315885": {
    "sale_id": "7315885",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "13451471",
    "transaction_id": "7938592974",
    "tickets": "1",
    "confirmation_number": "T6U82ZFH16793592",
    "total_cost": "27.50",
    "buyer_fee": "2.50",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "4",
    "discount": "0.00",
    "cardnumber": "5564",
    "first_four": null,
    "date": "2016-01-30 18:15:23",
    "address": "281 Scenic Rd",
    "address_2": "",
    "city": "Fairfax",
    "state": "CA",
    "zip": "94930",
    "country": "US",
    "phone": "4155952444",
    "email": "seangahearn@gmail.com",
    "purchase_for": "Shawn Ahearn",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    },
    "7317927": {
    "sale_id": "7317927",
    "event_id": "4117488",
    "seller_id": "22214",
    "user_id": "16893887",
    "transaction_id": "7938907137",
    "tickets": "2",
    "confirmation_number": "RZGY7UTY16797723",
    "total_cost": "55.00",
    "buyer_fee": "5.00",
    "seller_fee": "0.00",
    "buyer_fee_covered": "0",
    "custom_buyer_fee": "0.00",
    "addl_fees_total": "0.00",
    "service_fee_discount": "0.00",
    "donation": "0.00",
    "venue_fee": "0.00",
    "delivery_fee": "0.00",
    "delivery_type": "4",
    "discount": "0.00",
    "cardnumber": "4403",
    "first_four": null,
    "date": "2016-01-30 21:43:26",
    "address": "22 Live Oak Ave.",
    "address_2": "",
    "city": "Fairfax",
    "state": "CA",
    "zip": "94930",
    "country": "US",
    "phone": "4152152849",
    "email": "padmagordon@comcast.net",
    "purchase_for": "Padma Gordon",
    "is_POS": "0",
    "payment_method": "0",
    "currency": "USD"
    }
    }); 

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

      reportService.getSalesData($scope.salesData,function(response) {
        if (response!=null) {
          $rootScope.loader_div = true;
          if (response.code == 200 && response.data=='') {
          //if (response.code == 200 && response.data!='') {//change by Ashish
            //$scope.showClixDataObj.push(JSON.parse(response.data)); //change by Ashish
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
    $scope.showdatereports = true;

    $scope.$watch('datetype',function(){
      $scope.showdatereports =false;
      var gettype = $scope.datetype;
      
      if(gettype == "Custom"){
        $scope.showdatereports =true;
      }
    });
   
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
