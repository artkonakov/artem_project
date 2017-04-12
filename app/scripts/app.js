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
    'slickCarousel',
    'ksSwiper',
    'angular-loading-bar',
    'angularMoment',
    'moment-picker',
    'angularModalService',
    'ui-notification',
    'ngFileUpload'
  ])
    .config(function ($routeProvider, cfpLoadingBarProvider, NotificationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/akcii/:company/:id', {
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
            .when('/akcii/:company', {
                templateUrl: 'views/client.html',
                controller: 'ClientCtrl',
                controllerAs: 'client'
            })
            .when('/edit-offer/:id', {
                templateUrl: 'views/editoffer.html',
                controller: 'editOfferCtrl',
                controllerAs: 'editOffer'
            })
            .when('/edit-clients/:id', {
                templateUrl: 'views/editclient.html',
                controller: 'editClientCtrl',
                controllerAs: 'editClient'
            })
            .when('/edit-clients', {
                templateUrl: 'views/editclients.html',
                controller: 'editClientCtrl',
                controllerAs: 'editClient'
            })
            .when('/create-client', {
                templateUrl: 'views/createclient.html',
                controller: 'createClientCtrl',
                controllerAs: 'createClient'
            })
            .when('/create-offer', {
                templateUrl: 'views/createoffer.html',
                controller: 'createOfferCtrl',
                controllerAs: 'createOffer'
            })
            .otherwise({
                redirectTo: '/'
            });
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = true;
        NotificationProvider.setOptions({
            delay: 2000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 5,
            horizontalSpacing: 5,
            positionX: 'left',
            positionY: 'bottom'
        });
    })
    .run(['$rootScope', 'amMoment', function ($rootScope, amMoment) {
        amMoment.changeLocale('ru');
    }]);
