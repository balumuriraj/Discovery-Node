'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the discoveryApp
 */

app.controller('ProfileCtrl', ['$scope', '$location', 'userFactory', 'labsFactory', 'quizFactory', function ($scope, $location, userFactory, labsFactory, quizFactory) {

    $scope.user = userFactory.getLocalUser();

    quizFactory.getReports($scope.user.id)
        .success(function(responsedata){
            $scope.reports = responsedata;

            labsFactory.getAllLabs()
                .success(function(responsedata){
                    $scope.labs = responsedata;
                })
                .error(function(data) {
                    alert("Please try again");
                });
        })
        .error(function(data) {
            alert("Please try again");
        });

    $scope.showReport = function(id){
        $location.path('/report/' + id);
    }

}]);
