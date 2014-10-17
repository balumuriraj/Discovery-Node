'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the discoveryApp
 */

app.controller('ProfileCtrl', ['$scope', '$location', '$routeParams', 'userFactory', 'labsFactory', 'quizFactory', function ($scope, $location, $routeParams, userFactory, labsFactory, quizFactory) {

    var userid = $routeParams.id;
    var adminflag = false;

    function init(){
        if(userid){
            adminflag = true;
            userFactory.getUserbyId(userid)
                .success(function(responsedata){
                    $scope.user = responsedata;
                })
                .error(function(data) {
                    alert("Please try again");
                });
        }
        else{
          $scope.user = userFactory.getLocalUser();
          userid = $scope.user.id;
        }

        quizFactory.getReports(userid)
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
    }

    init();

    $scope.showReport = function(reportid, attempt){
        if(adminflag){
            $location.path('/admin/students/profile/report/' + userid + '/' + reportid + '/' + attempt);
        }
        else{
            console.log('/report/' + reportid + '/' + attempt);
            $location.path('/report/' + reportid + '/' + attempt);
        }
    };

}]);
