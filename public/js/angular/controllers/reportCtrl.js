'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the discoveryApp
 */

app.controller('ReportCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
    userFactory.getUser()
        .success(function(responsedata){
            $scope.user = responsedata;
        })
        .error(function(data) {
            alert("Please try again");
        });
}]);