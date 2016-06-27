/** 
Anguler Controller to manage event steps 
Created : 2016-04-19
Created By: Deepak khokkar  
Module : Event setting  
*/

angular.module('alisthub').controller('createpackageController', function($scope, $localStorage, $injector, $uibModal, $rootScope, $filter, $timeout, $sce, $location, $ocLazyLoad , $http,$stateParams) {
  //var $serviceTest = $injector.get("event_setting");
  var $serviceTest = $injector.get("event_package");

  $scope.success_message = false;
  $scope.error_message = true;
  

    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }

  /** 
  Method: click_menu
  Description:Function for changing the tab 
  Created : 2016-04-25
  Created By:  Deepak khokkar  
  */


  $scope.click_menu = function(menu, data, valid) {
    console.log('$stateParams.packageId ' , $stateParams.packageId);
    console.log('menu.id ' , menu.id );
    var objectForm = this;
    $scope.selectedClass = 1;
    console.log('menu.id' , menu.id);
    //To go to step1 event Details
    if (menu.id === 1) {
          console.log('------1----');
      if($stateParams.packageId != null && $stateParams.packageId !=undefined && $stateParams.packageId !='') {
            $location.path("/edit_event_step1/"+$stateParams.packageId);
          } 
    }

    ///TO move to price and level
    if (menu.id === 2) {
      console.log('------2----');
     if($stateParams.packageId != null && $stateParams.packageId !=undefined && $stateParams.packageId !='') {
            $location.path("/event_package_step_3/"+$stateParams.packageId);
          } 
    }

    if (menu.id === 3) {
            console.log('-----3----');
          if($stateParams.packageId != null && $stateParams.packageId !=undefined && $stateParams.packageId !='') {
            $location.path("/event_package_step_3/"+$stateParams.packageId);
          } 
    }
  }
  

    //To get steps
  $scope.steps=[
     { "title":"DETAILS","icon":'fa fa-calendar','id':1},
     { "title":"PRICING","icon":'fa fa-tags','id':2},
     { "title":"OPTIONS","icon":'fa fa-cog','id':3},
   ];
   
  $scope.loader = false;


  $scope.selected2 = $scope.steps[2];
  $scope.isActive2 = function(step2) {
    return $scope.selected2 === step2;
  };

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

  //timepicker
    // $scope.mytime = new Date();
  // timepicker end

  $scope.data = {};
  $scope.enable_on = {};
  $scope.disable_on = {};

  $scope.next_func = function(data) {
    console.log(data);
    $http.post('/event/postCreateEventStepFour' , data).then(function(response) {
      console.log("Response", response)
    })
  }

  /** Method : Date Time Merge 
  **/

$scope.redirectToDashboard = function() {
   $location.path("/dashboard");
}
  $scope.combine = function(dt, timeString) {
    var startDateTime = '';
    var parts = /^(\d+):(\d+) (AM|PM)$/.exec(timeString);
    if (parts) {
      hours = parseInt(parts[1], 10);
      minutes = parseInt(parts[2], 10);
      if (parts[3] === "PM" && hours !== 12) {
        hours += 12;
      } else if (parts[3] === "AM" && hours === 12) {
        hours = 0;
      }
      if (!isNaN(hours) && !isNaN(minutes)) {
        startDateTime = new Date(dt.getTime());
        startDateTime.setHours(hours);
        startDateTime.setMinutes(minutes);
      }
    }
    var d = new Date();
    var n = d.getTimezoneOffset(); 
    if (n > 0) {
      var newdate = new Date(startDateTime .getTime() + n*60000);
    } else {
      var newdate = new Date(startDateTime .getTime() - n*60000);
    }
    return newdate;
  }



  $scope.postThirdStepPackageData = function(data) {
    if($stateParams.packageId!=undefined && $stateParams.packageId!='') {
      $scope.data.id = $stateParams.packageId;
    } else {
      $scope.data.id = $localStorage.packageId;
    }

   // $scope.data.online_sales_open = $scope.combine($scope.data.online_sales_open.date,$scope.data.online_sales_open.time);
   // $scope.data.online_sales_close = $scope.combine($scope.data.online_sales_close.date,$scope.data.online_sales_close.time);

    if($scope.data.print_enable_date.date!=undefined && $scope.data.print_enable_date.time!=undefined && $scope.data.print_enable_date.date!='' && $scope.data.print_enable_date.time!=''){
      $scope.data.print_enable_date = $scope.combine($scope.data.print_enable_date.date,$scope.data.print_enable_date.time);  
    } 
    if($scope.data.print_disable_date.date!=undefined && $scope.data.print_disable_date.time!=undefined && $scope.data.print_disable_date.date!='' && $scope.data.print_disable_date.time!=''){
      $scope.data.print_disable_date = $scope.combine($scope.data.print_disable_date.date,$scope.data.print_disable_date.time);
    }

    console.log($scope.data);

    if ($localStorage.userId !== undefined) {
      $scope.data.user_id = $localStorage.userId;

      $serviceTest.postThirdStepPackageData($scope.data, function(response) {

          if (response.code === 200) {
            //$scope.data = response.result;

            $scope.success = global_message.save_package;
            $scope.success_message = true;

            $timeout(function() {
              $scope.error = '';
              $scope.success_message = false;
              $scope.success = '';
            }, 3000);

          } else {
            $scope.activation_message = global_message.ErrorInActivation;
          }

      });

    }
  }

  $scope.eventSetting = {};
    
  if($stateParams.packageId!=undefined && $stateParams.packageId!='') {
    //$scope.eventSetting.eventId = $stateParams.eventId;
    $scope.eventSetting.package_id = $stateParams.packageId;
  } else {
    //$scope.eventSetting.eventId = $localStorage.eventId;
    $scope.eventSetting.package_id = $localStorage.packageId;
  }

$scope.advSettingPackageId = $scope.eventSetting.package_id;
  $scope.eventSetting.user_id = $localStorage.userId;
  //To get settings 
 // $serviceTest.getSettings($scope.eventSetting, function(response) {
  $serviceTest.getPackage($scope.eventSetting, function(response) {
    $scope.data = response.results[0];
    if($scope.data!=undefined){
      $scope.data.will_call = parseInt($scope.data.will_call);
      $scope.data.sales_immediatly = parseInt($scope.data.sales_immediatly);
      $scope.data.donation = parseInt($scope.data.donation);
      $scope.data.custom_fee = parseInt($scope.data.custom_fee);
      $scope.data.question_required = parseInt($scope.data.question_required);
      $scope.data.collect_name = parseInt($scope.data.collect_name);

      var openDateTime = getDateTime($scope.data.online_sales_open);
      $scope.data.online_sales_open = {};
      $scope.data.online_sales_open.date = openDateTime.date;
      $scope.data.online_sales_open.time = openDateTime.time;

      var closeDateTime = getDateTime($scope.data.online_sales_close);
      $scope.data.online_sales_close = {};
      $scope.data.online_sales_close.date = closeDateTime.date;
      $scope.data.online_sales_close.time = closeDateTime.time;

      var enableDateTime = getDateTime($scope.data.print_enable_date);
      $scope.data.print_enable_date = {};
      $scope.data.print_enable_date.date = null;
      $scope.data.print_enable_date.time = null;
      
      if(enableDateTime.date!='' && enableDateTime.time!=''){
        $scope.data.print_enable_date.date = enableDateTime.date;
        $scope.data.print_enable_date.time = enableDateTime.time;  
      }

      var disableDateTime = getDateTime($scope.data.print_disable_date);
      $scope.data.print_disable_date = {};
      $scope.data.print_disable_date.date = disableDateTime.date;
      $scope.data.print_disable_date.time = disableDateTime.time;
    }

  });

  function toBoolean(value) {
    var strValue = String(value).toLowerCase();
    strValue = ((!isNaN(strValue) && strValue !== '0') &&
      strValue !== '' &&
      strValue !== 'null' &&
      strValue !== 'undefined') ? '1' : strValue;
    return strValue === 'true' || strValue === '1' ? true : false
  };

  function hours_am_pm(time) {
    var hours = time[0] + time[1];
    var min = time[2] + time[3];
    if (hours < 12) {
      return hours + ':' + min + ' AM';
    } else {
      hours=hours - 12;
      hours=(hours.length < 10) ? '0'+hours:hours;
      return hours+ ':' + min + ' PM';
    }
  }


  function getDateTime(openDate) {
    var date1 = new Date(openDate);
    
    if(date1!="Invalid Date" && openDate!=null) {
      console.log(openDate);
      var date = ('0' + (date1.getUTCDate())).slice(-2);
      var year = date1.getUTCFullYear();
      var month = ('0' + (date1.getUTCMonth()+1)).slice(-2);
      
      var hours = ('0' + (date1.getUTCHours())).slice(-2);
      var minutes = ('0' + (date1.getUTCMinutes())).slice(-2);
      var seconds = date1.getUTCSeconds();

      var convertedDate = {};
      convertedDate.date = new Date(year+"-"+month+"-"+date);

      convertedDate.time = hours_am_pm(hours+""+minutes);
      return convertedDate ;  
    } else {
      var convertedDate = {};
      convertedDate.date = null;
      convertedDate.time = null;
      return convertedDate ;
    }
  };

});