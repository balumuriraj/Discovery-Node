'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the discoveryApp
 */

app.controller('ReportCtrl', ['$scope', '$location', 'userFactory',
    function ($scope, $location, userFactory) {

        $scope.logout = function () {
            userFactory.logout();
            $location.path('/');
        }

}]);