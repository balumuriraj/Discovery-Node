'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the discoveryApp
 */

app.controller('HeaderCtrl', ['$scope', '$location', 'userFactory',
    function ($scope, $location, userFactory) {

        $scope.logout = function () {
            userFactory.logout();
            $location.path('/');
        }

}]);