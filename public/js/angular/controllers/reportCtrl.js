'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the discoveryApp
 */

app.controller('ReportCtrl', ['$scope', '$routeParams', 'userFactory', 'quizFactory', 'labsFactory', function ($scope, $routeParams, userFactory, quizFactory, labsFactory) {
    
    
    function init() {
        var id = $routeParams.id;
    
        userFactory.getUser()
            .success(function(responsedata){
                $scope.user = responsedata;
            })
            .error(function(data) {
                alert("Please try again");
            });

        quizFactory.getReport(id)
            .success(function(responsedata){
                $scope.report = responsedata;     

                labsFactory.getLab($scope.report.labid)
                    .success(function(responsedata){
                        $scope.lab = responsedata;
                        
                        //attempt percentage
                        var attper = ($scope.report.currentquestion/$scope.lab.labquestions.length) * 100;                    
                        $scope.attempted = { percent: attper, value: $scope.report.currentquestion };
                    
                        //score percentage
                        var scoreper = ($scope.report.score/($scope.lab.labquestions.length * 10)) * 100;
                        $scope.score = { percent: scoreper, value: $scope.report.score };
                    
                        //time percentage
                        var avgtime = $scope.report.clock/$scope.lab.labquestions.length;
                        var timeper = (avgtime/$scope.report.clock) * 100;
                        $scope.time = { percent: timeper, value: avgtime};
                    })
                    .error(function(data) {
                        alert("Please try again");
                    });
            })
            .error(function(data) {
                alert("Please try again");
            });   
    };
    
    init();
}]);