//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.

"use strict";

app.factory('userFactory', ['$http', '$cookieStore', 'localStorageService', function($http, $cookieStore, localStorageService) {
    //var baseUrl = "http://localhost:8080/Discoveryapi";
    var baseUrl = "http://api.discovery.a2c2.asu.edu";

    return {

        adminLogin: function(admin){
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: baseUrl + '/adminLogin',
                method: "POST",
                data: admin
            })
            .success(function(responseData) {
                console.log("Admin logged in: " + responseData.name);
                $cookieStore.put('adminloggedin', 'true');
                $cookieStore.put('userid', responseData.id);
            })
            .error(function(data) {
                console.log("Admin login failed.." + data);
            });
        },

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
                console.log("Guest user login failed..");
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
          /*
            return $http({
                url: 'https://weblogin.asu.edu/cas/validate?service=https%3A%2F%2Fdiscovery.a2c2.asu.edu&ticket=' + ticket,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("valid: " + responseData);
                $cookieStore.put('loggedin', 'true');
                $cookieStore.put('userid', '123');
            })
            .error(function(data) {
                console.log("Not valid..");
            });
          */

          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = 'https://weblogin.asu.edu/cas/validate?service=https%3A%2F%2Fdiscovery.a2c2.asu.edu&ticket=' + ticket + '?callback=myCallback';

          console.log("executing callback: " + script.src);
          function myCallback(data){
              var len = data.length;
              console.log("data: " + data)
              for(var i=0;i<len;i++){
                  console.log(data[i])
              }
              return data;
          }

        },

        getUser: function(){
            var userid = $cookieStore.get('userid');

            return $http({
                url: baseUrl + '/getUser/' + userid,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got User .. saving in local storage!");
                localStorageService.set(userid, responseData);
                return responseData;
            })
            .error(function(data) {
                console.log("Get User failed..");
            });

        },

        getUserbyId: function(userid){

            return $http({
                url: baseUrl + '/getUser/' + userid,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got User!");
                return responseData;
            })
            .error(function(data) {
                console.log("Get User failed..");
            });

        },

        getLocalUser: function(){
            console.log("Got User from local storage!");
            var userid = $cookieStore.get('userid');
            return localStorageService.get(userid);
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

        isAdminLoggedIn: function(){
            var loginstatus;
            loginstatus = $cookieStore.get('adminloggedin');
            if(loginstatus == null)
            {
                loginstatus = false;
            }
            return loginstatus;
        },

        logout: function(){
            $cookieStore.remove('adminloggedin');
            $cookieStore.remove('loggedin');
            $cookieStore.remove('userid');
            $cookieStore.remove('timer');
            localStorageService.clearAll();
        },

        addInstructor: function(instructor){
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: baseUrl + '/addInstructor',
                method: "POST",
                data: instructor
            })
            .success(function(responseData) {
                console.log("instructor added: " + responseData.name);
            })
            .error(function(data) {
                console.log("Add instructor failed..");
            });
        },

        getAllInstructors: function(){
            return $http({
                url: baseUrl + '/getInstructors',
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got all Instructors..");
                return responseData;
            })
            .error(function(data) {
                console.log("Get all Instructors failed..");
            });
        },

        deleteInstructor: function(id){
            return $http({
                url: baseUrl + '/deleteInstructor/' + id,
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Instructor deleted..");
            })
            .error(function(data) {
                console.log("delete Lab failed..");
            });
        },

        getAllStudents: function(){
            return $http({
                url: baseUrl + '/getAllUsers',
                method: "GET"
            })
            .success(function(responseData) {
                console.log("Got all Users!");
                return responseData;
            })
            .error(function(data) {
                console.log("Get all Users failed..");
            });

        }
    };
}]);
