'use strict';

/**
 * @ngdoc overview
 * @name discoveryApp
 * @description
 * # discoveryApp
 *
 * Main module of the application.
 */
var app = angular
    .module('discoveryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngDraggable',
    'ngTimer'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/js/angular/partials/home.html',
            controller: 'HomeCtrl',
            access: true
        })
        .when('/admin', {
            templateUrl: '/js/angular/partials/admin.html',
            controller: 'AdminCtrl',
            access: true
        })
        .when('/admin/lab/:id', {
            templateUrl: '/js/angular/partials/admin-create.html',
            controller: 'AdminCreateCtrl',
            access: true
        })
        .when('/labs', {
            templateUrl: '/js/angular/partials/labs.html',
            controller: 'LabsCtrl',
            access: false
        })
        .when('/profile', {
            templateUrl: '/js/angular/partials/profile.html',
            controller: 'ProfileCtrl',
            access: false
        })
        .when('/consent/:id', {
            templateUrl: '/js/angular/partials/consent.html',
            controller: 'ConsentCtrl',
            access: false
        })
        .when('/lab/:id', {
            templateUrl: '/js/angular/partials/quiz.html',
            controller: 'QuizCtrl',
            access: false
        })
        .when('/report/:id', {
            templateUrl: '/js/angular/partials/report.html',
            controller: 'ReportCtrl',
            access: false
        })
        .otherwise({
            redirectTo: '/'
        });
})

.run(['$rootScope', '$location', 'userFactory',
    function ($rootScope, $location, userFactory) {
        // register listener to watch route changes
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            //alert(next.access + " " + userFactory.isLoggedIn());
            if (!next.access) {
                if (!userFactory.isLoggedIn()) {
                    $location.path('/');
                }
            } else if (userFactory.isLoggedIn()) {
                $location.path('/labs');
            }
        });
}]);