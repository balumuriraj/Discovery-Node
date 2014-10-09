'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:AdminCreateCtrl
 * @description
 * # AdminCreateCtrl
 * Controller of the discoveryApp
 */

app.controller('AdminCreateCtrl', ['$scope', '$routeParams', 'labsFactory',
    function ($scope, $routeParams, labsFactory) {

        $scope.lab = {
            "id": "",
            "labname": "",
            "labdescription": "",
            "labquestions": []
        };

        $scope.editquestion;
        $scope.questions = [];
        $scope.optiontypes = ["RANGE", "CHOICE", "DRAGDROP", "TEXT"];

        $scope.emptyquestion = {
            "question": "",
            "description": "",
            "imagepath": "",
            "hint": "",
            "subquestions": []
        };
        $scope.emptysubquestion = {
            "subquestion": "",
            "correctanswer": "",
            "answerrange": "",
            "optiontype": "",
            "options": []
        };


        $scope.addQuestion = function(){
            var newquestion = angular.copy($scope.emptyquestion);
            $scope.questions.push(newquestion);
        };

        $scope.editQuestion = function(question){
            $scope.editquestion = question;
        };

        $scope.deleteQuestion = function(ques){
            var index = $scope.questions.indexOf(ques)
            $scope.questions.splice(index, 1);
        };

        $scope.deleteSavedQuestion = function(ques){
            var index = $scope.lab.labquestions.indexOf(ques)
            $scope.lab.labquestions.splice(index, 1);
            $scope.editquestion = null;
        };

        $scope.addSubQuestion = function(question){
            var newsubquestion = angular.copy($scope.emptysubquestion);
            question.subquestions.push(newsubquestion);
        };

        $scope.deleteSubQuestion = function(ques, sub){
            var index = ques.subquestions.indexOf(sub)
            ques.subquestions.splice(index, 1);
        };

        $scope.addChoice = function(subquestion, type){
            if(angular.equals(type, "RANGE")){
                subquestion.options.length = 0;
                subquestion.options.length = 2;

            } else if(angular.equals(type, "CHOICE")){
                subquestion.options.length = 0;
                subquestion.options.length = 4;

            } else if(angular.equals(type, "DRAGDROP")){
                subquestion.options.length = 0;
                subquestion.options.length = 4;
            } else{
                subquestion.options.length = 0;
            }

        }

        $scope.savequestion = function(ques){
            $scope.lab.labquestions.push(ques);
            $scope.deleteQuestion(ques);
        };

        $scope.saveEditQuestion = function(){
            $scope.editquestion = null;
        };

        $scope.saveLab = function(){
            labsFactory.addLab($scope.lab)
                .success(function(responsedata){
                    $scope.lab = responsedata;

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
                    alert("Please try again");
                });
        };

        function init(){
            console.log("Id is " + $routeParams.id);
            var id = $routeParams.id;

            if(id != "create"){
                labsFactory.getLab(id)
                    .success(function(responsedata){
                        $scope.lab = responsedata;
                    })
                    .error(function(data) {

                        var block = $('#failuremsg');
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
                    });
            }
        };

        init();

}]);
