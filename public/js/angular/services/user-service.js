//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.

"use strict";

app.factory('userFactory', ['$http', '$cookieStore', function($http, $cookieStore) {
    var baseUrl = "http://localhost:8080/Discoveryapi";
    //var baseUrl = "http://discovery.a2c2.asu.edu/:9090/";
    
    return {
        guestUserLogin: function(user){
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: baseUrl + '/guestUserLogin',
                method: "POST",
                data: user
            })
            .success(function(responseData) {
                console.log("Guest user logged in: " + responseData.name);
                $cookieStore.put('loggedin', 'true');
                $cookieStore.put('userid', responseData.id);
            })
            .error(function(data) {
                console.log("Guest user log in failed..");
            });
        },
        
        casAuth: function(){
            return $http({
                url: 'https://weblogin.asu.edu/cas/login',
                method: "GET"
            })
            .success(function(responseData) {
                console.log("ASU user logged in: " + responseData);
            })
            .error(function(data) {
                console.log("ASU user log in failed..");
            });
        },
        
        validateTicket: function(ticket){
            return $http({
                url: 'https://weblogin.asu.edu/cas/validate?service=https%3A%2F%2Fdiscovery.a2c2.asu.edu&ticket=' + ticket,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("valid: " + responseData);
            })
            .error(function(data) {
                console.log("Not valid..");
            });
        },
        
        getUser: function(){
            var userid = $cookieStore.get('userid');
            
            return $http({
                url: baseUrl + '/getUser/' + userid,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got User ..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get User failed..");
            });
        },
        
        isLoggedIn: function(){
            var loginstatus;
            loginstatus = $cookieStore.get('loggedin');
            if(loginstatus == null)
            {
                loginstatus = false;
            }
            return loginstatus;
        },
        
        logout: function(){
            $cookieStore.remove('loggedin');
            $cookieStore.remove('userid');
            $cookieStore.remove('timer');
        }
    };
}]);