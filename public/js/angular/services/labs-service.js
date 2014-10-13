//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.

"use strict";

app.factory('labsFactory', ['$http', 'localStorageService', function($http, localStorageService) {
    var baseUrl = "http://localhost:8080/Discoveryapi";
    //var baseUrl = "http://api.discovery.a2c2.asu.edu";

    return {
        getAllLabs: function(){
            return $http({
                url: baseUrl + '/getLabs',
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got all Labs..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get all Labs failed..");
            });
        },

        getLab: function(id){
            return $http({
                url: baseUrl + '/getLab/' + id,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got Lab .. saving in local storage");

                // Start fresh
                localStorageService.remove(id);

                // Set lab
                localStorageService.set(id, responseData);
                return responseData;
            })
            .error(function(data) {
                console.log("Get Lab failed..");
            });
        },

        getLocalLab: function(id){
            console.log("Got Lab from local storage");
            return localStorageService.get(id);
        },

        addLab: function(lab){
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: baseUrl + '/addLab',
                method: "POST",
                data: lab
            })
            .success(function(responseData) {
                console.log("Lab Added..");
                return responseData;
            })
            .error(function(data) {
                console.log("Adding Lab failed..");
            });
        },

        deleteLab: function(lab){
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: baseUrl + '/deleteLab',
                method: "POST",
                data: lab
            })
            .success(function(responseData) {
                console.log("Lab deleted..");
            })
            .error(function(data) {
                console.log("delete Lab failed..");
            });
        }
    };
}]);
