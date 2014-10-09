'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:ReportCtrl
 * @description
 * # ReportCtrl
 * Controller of the discoveryApp
 */

app.controller('ReportCtrl', ['$scope', '$routeParams', 'userFactory', 'quizFactory', 'labsFactory', function ($scope, $routeParams, userFactory, quizFactory, labsFactory) {
    
    $scope.attemptcount;   
    
    function init() {
        var id = $routeParams.id;
        $scope.user = userFactory.getLocalUser();

        quizFactory.getReport(id)
            .success(function(responsedata){
                $scope.report = responsedata; 
                $scope.attemptcount = $scope.report.attempts.length - 1;   
                $scope.lab = labsFactory.getLocalLab($scope.report.labid);

                //attempt percentage
                var attper = ($scope.report.attempts[$scope.attemptcount].currentquestion/$scope.lab.labquestions.length) * 100;                    
                $scope.attempted = { percent: attper, value: $scope.report.attempts[$scope.attemptcount].currentquestion };

                //score percentage
                var scoreper = ($scope.report.attempts[$scope.attemptcount].score/($scope.lab.labquestions.length * 10)) * 100;
                $scope.score = { percent: scoreper, value: $scope.report.attempts[$scope.attemptcount].score };

                //time percentage
                var avgtime = (($scope.report.attempts[$scope.attemptcount].clock/$scope.lab.labquestions.length)/60).toFixed(2);;
                var timeper = (avgtime/$scope.report.attempts[$scope.attemptcount].clock) * 100 * 60;
                $scope.time = { percent: timeper, value: avgtime};
            
            })
            .error(function(data) {
                alert("Please try again");
            });   
    };
    
    init();
}]);