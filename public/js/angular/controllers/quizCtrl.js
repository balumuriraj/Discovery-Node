'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:QuizCtrl
 * @description
 * # QuizCtrl
 * Controller of the discoveryApp
 */

app.controller('QuizCtrl', ['$scope', '$routeParams', '$cookieStore', '$location', 'labsFactory', 'userFactory', 'quizFactory', function ($scope, $routeParams, $cookieStore, $location, labsFactory, userFactory, quizFactory) {
    
    $scope.useranswer = {
        "id": "",
        "userid": "",
        "labid": "",
        "currentquestion": "",
        "score": "",
        "clock": "",
        "submitstatus": "",
        "answers": [] 
    };
    
    $scope.emptyAnswer = {
        "id": "",        
        "subanswers": []
    };
    
    $scope.emptySubAnswer = {
        "id": "",
        "subanswer": ""
    };
                            
    function init(){
        console.log("Id is " + $routeParams.id);            
        var id = $routeParams.id;

        userFactory.getUser()
            .success(function(responsedata){
                $scope.user = responsedata;
                
                labsFactory.getLab(id)
                    .success(function(responsedata){
                        $scope.lab = responsedata;
                        
                        $scope.useranswer.userid = $scope.user.id;
                        $scope.useranswer.labid = id;
                        $scope.useranswer.currentquestion = 0;
                        $scope.useranswer.score = 0;
                        
                        for(var i=0; i<$scope.lab.labquestions.length; i++)
                        {
                            var newanswer = angular.copy($scope.emptyAnswer);
                            newanswer.id = i+1;
                            
                            for(var j=0; j<$scope.lab.labquestions[i].subquestions.length; j++)
                            {
                                var newsubanswer = angular.copy($scope.emptySubAnswer);
                                newsubanswer.id = j+1;
                                newsubanswer.subanswer = "";

                                newanswer.subanswers.push(newsubanswer);
                            }

                            $scope.useranswer.answers.push(newanswer);
                        }
                        
                    })
                    .error(function(data) {
                        alert("Please try again");
                    });
            })
            .error(function(data) {
                alert("Please try again");
            });
        
        var timer = $cookieStore.get('timer');
        if(timer == null)
        {
            timer = 0;
        } 
        
        $scope.useranswer.clock = timer;
        
    };
        
    init();

    $scope.onDropComplete=function(data,evt,ques,index){        
        $scope.useranswer.answers[ques].subanswers[index].subanswer = data;
    }
    
    $scope.submitAnswer = function(useranswer) {        
        
        quizFactory.submitAnswer(useranswer)
            .success(function(responsedata){
                var currentques = responsedata.currentquestion;
                
                console.log("Current Ques: "+ currentques);
                
                if(currentques == responsedata.answers.length){
                    console.log("Removing timer..");
                    $cookieStore.remove('timer');
                    $location.path('/report/'+responsedata.id);
                }
                
                $scope.useranswer = responsedata;
            })
            .error(function(data) {
                alert("Please try again");
            });
    }

    
}]);