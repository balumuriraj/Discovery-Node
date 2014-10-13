'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:AdminLoginCtrl
 * @description
 * # AdminLoginCtrl
 * Controller of the discoveryApp
 */

app.controller('AdminLoginCtrl', ['$scope', '$location', 'userFactory',
    function ($scope, $location, userFactory) {

        $scope.admin = {email: '', name: ''};
        $scope.loading = false;
        $scope.serviceerror = false;

        $scope.submitAdminForm = function(isValid) {

            $scope.loading = true;

            // check to make sure the form is completely valid
            if (isValid) {
                userFactory.adminLogin($scope.admin)
                    .success(function(responsedata){
                        $scope.loading = false;
                        $scope.serviceerror = false;
                        $location.path('/admin');
                    })
                    .error(function(data) {
                        $scope.loading = false;
                        $scope.serviceerror = true;
                    });
            }
        };

        $scope.logout = function () {
            userFactory.logout();
            $location.path('/admin-login');
        }
}]);
