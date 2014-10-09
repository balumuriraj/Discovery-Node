'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:AdminSettingsCtrl
 * @description
 * # AdminSettingsCtrl
 * Controller of the discoveryApp
 */

app.controller('AdminSettingsCtrl', ['$scope', 'userFactory',
    function ($scope, userFactory) {
        $scope.deleteloading = false;
        $scope.instructor = {id:'', email: '', name: ''};
        $scope.loading = false;
        $scope.serviceerror = false;

        $scope.submitInstructorForm = function(isValid) {

            $scope.loading = true;

            // check to make sure the form is completely valid
            if (isValid) {
                userFactory.addInstructor($scope.instructor)
                    .success(function(responsedata){
                        $scope.loading = false;
                        $scope.serviceerror = false;
                        $scope.instructor = {email: '', name: ''};
                        $scope.addInstructorForm.$setPristine();
                        init();

                        var block = $('#successmsg');
                        block.css({
                            'visibility': 'visible',
                            'opacity': '1'
                        });

                        setTimeout(function(){
                            block.css({
                                'visibility': 'hidden',
                                'opacity': '0'
                            });
                        }, 5000);
                    })
                    .error(function(data) {
                        $scope.loading = false;
                        $scope.serviceerror = true;
                    });
            }
        };

        $scope.deleteInstructor = function(id) {

            $scope.deleteloading = true;
            userFactory.deleteInstructor(id)
                .success(function(responsedata){
                    $scope.deleteloading = false;
                    init();
                })
                .error(function(data) {
                    $scope.deleteloading = false;
                });
        };

        function init() {
            userFactory.getAllInstructors()
                .success(function (responsedata) {
                    $scope.instructors = responsedata;
                })
                .error(function (data) {
                    $scope.servicerror = true;
                });
        };

        init();
}]);
