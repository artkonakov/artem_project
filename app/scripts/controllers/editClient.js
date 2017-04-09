'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('editClientCtrl', ['$scope', 'ModalService', '$stamplay', '$route', '$routeParams', function ($scope, ModalService, $stamplay, $route, $routeParams) {

        $scope.userName = "Гость";
        $scope.newOffer;
        $scope.currentId = $routeParams.id;
        console.log($scope.currentId);
        var query = {
            "_id": $scope.currentId
        }
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

                    console.log($scope.offers);

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

                    console.log($scope.clients);

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
                    console.log($scope.types);

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
                    console.log($scope.categories);

                }, function (err) {
                    // error
                    console.log(err);
                });
        };


        $scope.getData();
        $scope.getClients();
        $scope.getTypes();
        $scope.getCategories();
        
        
        $scope.createOffer = function () {

            $stamplay.Object("offers").save($scope.newOffer)
                .then(function (res) {
                    // success
                    $scope.newOffer = {};
                    $scope.getData();
                    console.log(res);
                }, function (err) {
                    // error

                    console.log(err);
                });



        };

        $scope.UpdateOffers = function ($index) {
            //delete $scope.offers[$index].$$hashKey;
            console.log($scope.offers[0]);
            $stamplay.Object("offers").patch($scope.offers[0].id, $scope.offers[0])
                .then(function (res) {
                    // success
                    console.log(res);
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


    }]);
