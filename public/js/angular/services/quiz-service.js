//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.

"use strict";

app.factory('quizFactory', ['$http', '$cookieStore', function($http, $cookieStore) {
    var baseUrl = "http://localhost:8080/Discoveryapi";
    //var baseUrl = "http://discovery.a2c2.asu.edu:9090";
    
    return {
        submitAnswer: function(useranswer){
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: baseUrl + '/submitAnswer',
                method: "POST",
                data: useranswer
            })
            .success(function(responseData) {
                console.log("Submitted Answer..");
                return responseData;
            })
            .error(function(data) {
                console.log("Submit Answer failed..");
            });
        },
        
        createUserAnswerDoc: function(labid, userid){
            return $http({
                url: baseUrl + '/createUserAnswerDoc/' + labid + '/' + userid,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got UserAnswerDoc ..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get UserAnswerDoc failed..");
            });
        },
        
        getUserAnswerDoc: function(id){
            return $http({
                url: baseUrl + '/getUserAnswerDoc/' + id,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got UserAnswerDoc ..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get UserAnswerDoc failed..");
            });
        },
        
        getReport: function(id){
            return $http({
                url: baseUrl + '/getReport/' + id,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got Report ..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get Report failed..");
            });
        },
        
        getReports: function(id){
            return $http({
                url: baseUrl + '/getReports/' + id,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got Report ..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get Report failed..");
            });
        }
    };
    
    
}]);