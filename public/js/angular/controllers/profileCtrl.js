'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the discoveryApp
 */

app.controller('ProfileCtrl', ['$scope', 'userFactory', function ($scope, userFactory) {
    userFactory.getUser()
        .success(function(responsedata){
            $scope.user = responsedata;
        })
        .error(function(data) {
            alert("Please try again");
        });
}]);