'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:LabsCtrl
 * @description
 * # LabsCtrl
 * Controller of the discoveryApp
 */

app.controller('LabsCtrl', ['$scope', '$location', 'labsFactory',
    function ($scope, $location, labsFactory) {

        function init() {
            labsFactory.getAllLabs()
                .success(function (responsedata) {
                    $scope.labs = responsedata;
                })
                .error(function (data) {
                    $scope.servicerror = true;
                });
        };
        
        init();
        
        $scope.startLab = function(id){
            $location.path('/consent/'+id);
        }
}]);