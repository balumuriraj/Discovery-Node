'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:profileCtrl
 * @description
 * # profileCtrl
 * Controller of the discoveryApp
 */

app.controller('ProfileCtrl', ['$scope', '$q', 'userFactory', 'labsFactory', 'quizFactory', function ($scope, $q, userFactory, labsFactory, quizFactory) {
    
    var deferred = $q.defer();
    var promise = deferred.promise;

    promise.then(function(result){
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
    }, function(reason){

    });
    
    userFactory.getUser()
        .success(function(responsedata){
            $scope.user = responsedata;
            deferred.resolve('success'); 
        })
        .error(function(data) {
            alert("Please try again");
        }); 
    
}]);