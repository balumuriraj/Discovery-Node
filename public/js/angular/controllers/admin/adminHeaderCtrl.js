'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:AdminHeaderCtrl
 * @description
 * # AdminHeaderCtrl
 * Controller of the discoveryApp
 */

app.controller('AdminHeaderCtrl', ['$scope', '$location', 'userFactory',
    function ($scope, $location, userFactory) {

        $scope.logout = function () {
            userFactory.logout();
            $location.path('/admin-login');
        }
}]);
