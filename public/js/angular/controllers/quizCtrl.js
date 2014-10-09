'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:QuizCtrl
 * @description
 * # QuizCtrl
 * Controller of the discoveryApp
 */

app.controller('QuizCtrl', ['$scope', '$q', '$routeParams', '$cookieStore', '$location', 'labsFactory', 'quizFactory', function ($scope, $q, $routeParams, $cookieStore, $location, labsFactory, quizFactory) {
    
    $scope.useranswer;
    $scope.errors = false;     
    $scope.attemptcount;        
    $scope.currentquestion;
                            
    function init(){
        console.log("Doc Id is " + $routeParams.id);            
        var id = $routeParams.id;
        
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(function(result){
            
            $scope.attemptcount = $scope.useranswer.attempts.length - 1;            
            $scope.currentquestion = $scope.useranswer.attempts[$scope.attemptcount].currentquestion;     
            
            $scope.lab = labsFactory.getLocalLab($scope.useranswer.labid);
            console.log($scope.lab);
            
        }, function(reason){
            
        });

        quizFactory.getUserAnswerDoc(id)
            .success(function(responsedata){
                $scope.useranswer = responsedata;
                deferred.resolve('success'); 
            })
            .error(function(data) {
                alert("Please try again");
            });
        
    };
        
    init();

    $scope.onDropComplete=function(data,evt,ques,index){        
        $scope.useranswer.attempts[$scope.attemptcount].answers[ques].subanswers[index].subanswer = data;
    }
    
    $scope.submitAnswer = function(useranswer) {   
        
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise.then(function(result){
            
            //validation
            var testanswer = useranswer.attempts[$scope.attemptcount].answers[$scope.currentquestion].subanswers;
            var flag = true;
            
            for(var i=0; i < testanswer.length; i++){
                console.log(i + ": " + testanswer[i].subanswer);
                if(testanswer[i].subanswer == ""){
                    flag = false;
                }
            }
            
            if(flag){                
                quizFactory.submitAnswer(useranswer)
                    .success(function(responsedata){
                        $scope.useranswer = responsedata;
                        $scope.errors = false; 
                        $scope.attemptcount = $scope.useranswer.attempts.length - 1;            
                        $scope.currentquestion = $scope.useranswer.attempts[$scope.attemptcount].currentquestion; 
                    
                        if($scope.currentquestion == $scope.useranswer.attempts[$scope.attemptcount].answers.length){
                            console.log("Removing timer..");
                            $cookieStore.remove('timer');
                            $location.path('/report/'+responsedata.id);
                        }
                        
                    })
                    .error(function(data) {
                        alert("Please try again");
                    });
            } else{
                $scope.errors = true; 
            }
            
        }, function(reason){
            
        });
        
        
        $('#submitModal').modal('hide');        
        $('#submitModal').on('hidden.bs.modal', function () {
            deferred.resolve('success'); 
        })
    }

    
}]);