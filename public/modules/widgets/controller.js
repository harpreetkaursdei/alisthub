

angular.module('alisthub').controller('controller', function($scope,$localStorage,$injector, $uibModal,$rootScope, $filter,$timeout,$sce,$location) { 
   //For Step 1
    var $serviceTest = $injector.get("venues");
    $scope.select_delect_event=$scope.monthly_div=$scope.days_div=$scope.error_message=$scope.error_time_message=true;
  //////////////////////////////////////////////////////
   $scope.upcoming_event_data=$scope.past_event_data=$scope.event_package_data = [
            {id:4110591, event:'The Lion King',desc:'Minskoff theatre (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'10',inventory:'900'},
            {id:4110592, event:'The Lion King2',desc:'Minskoff1 theatre1 (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'20',inventory:'500'},
            {id:4110593, event:'The Lion King3',desc:'Minskoff1 theatre1 (New York, NY)',date:'Sat Mar 12 2016 at 12:00pm',sold:'30',inventory:'600'}
        ];
    if(window.innerWidth>767){ 
    $scope.navCollapsed = false;    
    }else{
    $scope.navCollapsed = true;
    $scope.toggleMenu = function() {
    $scope.navCollapsed = $scope.navCollapsed === false ? true: false;
    };    
 }
 });