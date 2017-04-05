'use strict';

/**
 * @ngdoc overview
 * @name resdokWebApp
 * @description
 * # resdokWebApp
 *
 * Main module of the application.
 */
angular
    .module('resdokWebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStamplay',
    'contenteditable',
    'angucomplete-alt',
    '720kb.datepicker'
  ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .when('/admin', {
                templateUrl: 'views/admin.html',
                controller: 'AdminCtrl',
                controllerAs: 'admin'
            })
            .when('/edit', {
                templateUrl: 'views/edit.html',
                controller: 'EditCtrl',
                controllerAs: 'edit'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
