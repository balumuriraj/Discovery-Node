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
    'ngTimer',
    'ngd3',
    'LocalStorageModule'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/js/angular/partials/home.html',
            access: true
        })
        .when('/admin', {
            templateUrl: '/js/angular/partials/admin/admin.html',
            access: true
        })
        .when('/admin-login', {
            templateUrl: '/js/angular/partials/admin/admin-login.html',
            access: true
        })
        .when('/admin/settings', {
            templateUrl: '/js/angular/partials/admin/admin-management.html',
            access: true
        })
        .when('/admin/lab/:id', {
            templateUrl: '/js/angular/partials/admin/admin-create.html',
            access: true
        })
        .when('/admin/students', {
            templateUrl: '/js/angular/partials/admin/admin-students.html',
            access: true
        })
        .when('/labs', {
            templateUrl: '/js/angular/partials/labs.html',
            access: false
        })
        .when('/profile', {
            templateUrl: '/js/angular/partials/profile.html',
            access: false
        })
        .when('/consent/:id', {
            templateUrl: '/js/angular/partials/consent.html',
            access: false
        })
        .when('/lab/:id', {
            templateUrl: '/js/angular/partials/quiz.html',
            access: false
        })
        .when('/report/:id', {
            templateUrl: '/js/angular/partials/report.html',
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
            var url = next.templateUrl;
            if (!next.access && !(url.indexOf("admin") > -1)) {
                if (!userFactory.isLoggedIn()) {
                    $location.path('/');
                }
            } else if (!next.access && (url.indexOf("admin") > -1)) {
                if (!userFactory.isAdminLoggedIn()) {
                    $location.path('/admin-login');
                }
            } else if (userFactory.isLoggedIn()) {
                $location.path('/labs');
            } else if (userFactory.isAdminLoggedIn()) {
                $location.path('/admin');
            }
        });
}]);
