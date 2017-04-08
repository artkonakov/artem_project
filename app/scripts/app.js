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
    '720kb.datepicker',
    'slickCarousel',
    'ksSwiper',
    'angular-loading-bar',
    'angularMoment',
    'moment-picker',
    'angularModalService'
  ])
    .config(function ($routeProvider, cfpLoadingBarProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/:company/:id', {
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
            .when('/:company', {
                templateUrl: 'views/client.html',
                controller: 'ClientCtrl',
                controllerAs: 'client'
            })
            .otherwise({
                redirectTo: '/'
            });
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
    })
    .run(['$rootScope', 'amMoment', function ($rootScope, amMoment) {
        amMoment.changeLocale('ru');
    }])
