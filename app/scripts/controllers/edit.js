'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('EditCtrl', ['$scope', '$stamplay', '$route', function ($scope, $stamplay, $route) {

        $scope.newOffer;

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
            $stamplay.Object("offers").get({})
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
        $scope.getData();
        $scope.getClients();
        
        $scope.createOffer = function () {

            Stamplay.Object("offers").save($scope.newOffer)
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
            delete $scope.offers[$index].$$hashKey;
            console.log($scope.offers[$index]);
            $stamplay.Object("offers").patch($scope.offers[$index]._id, $scope.offers[$index])
                .then(function (res) {
                    // success
                    console.log(res);
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


    }]);
