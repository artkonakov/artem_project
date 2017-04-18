'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('createTypeCtrl', ['$scope', 'ModalService', '$stamplay', '$route', '$routeParams', 'Notification', 'Upload', function ($scope, ModalService, $stamplay, $route, $routeParams, Notification, Upload) {

        $scope.userName = "Гость";





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
            $stamplay.Object("types").get(query)
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

        $scope.UpdateTypes = function ($index) {
            delete $scope.types[$index].$$hashKey;

            $stamplay.Object("types").patch($scope.types[$index].id, $scope.types[$index])
                .then(function (res) {
                    // success
                    new Notification({
                        message: 'Обновлено'
                    }, 'success');
                    $scope.getTypes();
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

        $scope.UpdateCategories = function ($index) {
            delete $scope.categories[$index].$$hashKey;

            $stamplay.Object("categories").patch($scope.categories[$index]._id, $scope.categories[$index])
                .then(function (res) {
                    // success
                    console.log(res);
                    new Notification({
                        message: 'Категория обновлена'
                    }, 'success');
                    $scope.getTypes();
                }, function (err) {
                    // error
                    console.log(err);
                });

        };

        $scope.createNewType = function () {
            $stamplay.Object("types").save($scope.newType)
                .then(function (res) {
                    // success
                    $scope.newType= {};
                    new Notification({
                        message: 'Новый тип создан'
                    }, 'success');
                }, function (err) {
                    // error
                    new Notification({
                        message: err
                    }, 'warning');
                });
        };


        $scope.getTypes();

    }]);
