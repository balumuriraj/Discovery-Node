'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:ConsentCtrl
 * @description
 * # ConsentCtrl
 * Controller of the discoveryApp
 */

app.controller('ConsentCtrl', ['$scope', '$q', '$location', '$routeParams', '$cookieStore', 'localStorageService', 'labsFactory', 'userFactory', 'quizFactory',
    function ($scope, $q, $location, $routeParams, $cookieStore, localStorageService, labsFactory, userFactory, quizFactory) {
        
        function init(){
            console.log("Id is " + $routeParams.id);            
            var id = $routeParams.id;
            
            $scope.lab = labsFactory.getLocalLab(id);
            
            if($scope.lab === null){
                labsFactory.getLab(id)
                    .success(function(responsedata){
                        $scope.lab = responsedata;
                    })
                    .error(function(data) {
                        alert("Please try again");
                    });
            }        
            
            $scope.user = userFactory.getLocalUser();

        };
        
        init();
        
        $scope.startLab = function(labid, userid){   
            var id;
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            promise.then(function(result){                           
                $location.path('/lab/'+id);
            }, function(reason){
            
            });
            
            quizFactory.createUserAnswerDoc(labid, userid)
                .success(function(responsedata) {
                    console.log("Got new attempt: " + responsedata.id);
                    id = responsedata.id;
                    $cookieStore.put('timer', 0); 
                    deferred.resolve('success'); 
                })
                .error(function(responsedata) {
                    deferred.reject('failure'); 
                })
            
        }

}]);