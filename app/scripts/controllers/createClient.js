'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('createClientCtrl', ['$scope', 'ModalService', '$stamplay', '$route', '$routeParams', 'Notification', function ($scope, ModalService, $stamplay, $route, $routeParams, Notification) {

        $scope.userName = "Гость";

        $scope.helperAdress = 1;
        $scope.getNumber = function (num) {
            return new Array(num);
            $scope.newClient.location = [];

        }
        $scope.newClient = {
            "img": "/images/default-client.jpg",
            "phones": [],
            "location": [],
        };

        //  $stamplay.User.socialLogin("auth0") ;  

        $stamplay.User.currentUser()
            .then(function (res) {
                // success
                $scope.userName = res.user.displayName;
                $scope.$apply(function () {
                    $scope.userName;
                });
            }, function (err) {
                // error
                console.log(err);
            });

        $scope.loggout = function () {
            if ($stamplay.User.currentUser()) {

                $stamplay.User.logout(true, function (err, res) {
                    $scope.$apply(function () {
                        $scope.userName = "Гость";
                    });
                    console.log(res);
                });

            }
        };

        $scope.getData = function () {
            $stamplay.Object("offers").get(query)
                .then(function (res) {
                    // success
                    $scope.$apply(function () {
                        $scope.offers = res.data;
                    });
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.getClients = function () {
            $stamplay.Object("clients").get({})
                .then(function (res) {
                    // success
                    $scope.$apply(function () {
                        $scope.clients = res.data;
                    });
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.getTypes = function () {
            $stamplay.Object("types").get()
                .then(function (res) {
                    // success
                    $scope.$apply(function () {
                        $scope.types = res.data;
                    });
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.getCategories = function () {
            $stamplay.Object("categories").get()
                .then(function (res) {
                    // success
                    $scope.$apply(function () {
                        $scope.categories = res.data;
                    });
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.UpdateOffers = function () {
            //delete $scope.offers[$index].$$hashKey;
            console.log($scope.offers[0]);
            $stamplay.Object("offers").patch($scope.offers[0].id, $scope.offers[0])
                .then(function (res) {
                    // success
                    new Notification({
                        message: 'Обновлено'
                    }, 'success');
                    $scope.getData();
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.deleteOffer = function ($index) {
            var deletedObId = $scope.offers[$index]._id;
            console.log(deletedObId);
            $stamplay.Object("offers").remove(deletedObId)
                .then(function (res) {
                    // success
                    $scope.getData();
                    console.log(res);
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.show = function () {
            ModalService.showModal({
                templateUrl: 'views/modal.html',
                controller: "MainCtrl"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    $scope.message = "You said " + result;
                });
            });
        };

        $scope.createNewClient = function () {
            $stamplay.Object("clients").save($scope.newClient)
                .then(function (res) {
                    // success
                    $scope.newClient = {
                        "img": "/images/default-client.jpg",
                        "phones": [],
                        "location": [],
                    };
                    new Notification({
                        message: 'Новый клиент создан'
                    }, 'success');
                }, function (err) {
                    // error
                    new Notification({
                        message: err
                    }, 'warning');
                });
        };


    }]);
