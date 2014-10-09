'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:LabsCtrl
 * @description
 * # LabsCtrl
 * Controller of the discoveryApp
 */

app.controller('LabsCtrl', ['$scope', '$location', 'localStorageService', 'labsFactory', 'userFactory',
    function ($scope, $location, localStorageService, labsFactory, userFactory) {

        function init() {
            labsFactory.getAllLabs()
                .success(function (responsedata) {
                    $scope.labs = responsedata;
                })
                .error(function (data) {
                    $scope.servicerror = true;
                });
            
            $scope.user = userFactory.getLocalUser();
            
            if($scope.user === null){
                userFactory.getUser()
                    .success(function(responsedata){
                        $scope.user = responsedata;
                    })
                    .error(function(data) {
                        alert("Please try again");
                    });    
            }
        };
        
        init();
        
        $scope.startLab = function(id){
            $location.path('/consent/'+id);
        }
}]);