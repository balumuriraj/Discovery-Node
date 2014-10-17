'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:AdminStudentsCtrl
 * @description
 * # AdminStudentsCtrl
 * Controller of the discoveryApp
 */

app.controller('AdminStudentsCtrl', ['$scope', '$location', 'userFactory',
    function ($scope, $location, userFactory) {

        function init() {
            userFactory.getAllStudents()
                .success(function (responsedata) {
                    $scope.students = responsedata;
                })
                .error(function (data) {
                    $scope.servicerror = true;
                });
        };

        init();
}]);
