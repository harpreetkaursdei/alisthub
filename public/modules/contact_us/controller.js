angular.module('alisthub')
    .controller('contactController', function($scope, $localStorage, $http, $state, $location, ngTableParams, $timeout, $window, $rootScope, $injector, $stateParams) {

        var $serviceConnect = $injector.get("contact_us");

        $scope.data = {};
        $scope.submitContact = function() {
            if ($localStorage.userId != undefined)

            {
                $scope.data.seller_id = $localStorage.userId;
                $scope.loader = true;
                $serviceConnect.submitContact($scope.data, function(response) {
                    $scope.loader = false;
                    if (response.code == 200) {


                    } else {
                        $scope.activation_message = global_message.ErrorInActivation;
                    }


                })
            }
        }



    });
