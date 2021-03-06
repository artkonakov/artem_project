'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('editOfferCtrl', ['$scope', 'ModalService', '$stamplay', '$route', '$routeParams', 'Notification', 'Upload', '$location', function ($scope, ModalService, $stamplay, $route, $routeParams, Notification, Upload, $location) {

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

        $scope.deleteOffer = function () {

            $stamplay.Object("offers").remove($scope.offers[0].id)
                .then(function (res) {
                    // success
                    $location.path('/edit');

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

        $scope.createOffer = function () {
            $stamplay.Object("offers").save($scope.newOffer)
                .then(function (res) {
                    // success
                    $scope.submit();
                    $scope.newOffer = {};
                    new Notification({
                        message: 'Новая акция создана'
                    }, 'success');
                }, function (err) {
                    // error
                    new Notification({
                        message: err
                    }, 'warning');
                });
        };

        // upload later on form submit or something similar
        $scope.submit = function () {
            if ($scope.form.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };


        // upload on file select or drop
        $scope.upload = function (file) {
            $scope.username = 'user';
            Upload.upload({
                url: 'upload.php',
                data: {
                    file: file,
                    'username': $scope.username,
                    'targetPath': 'uploads/offers/'
                }
            }).then(function (resp) {

                $scope.offers[0].offer_url = '/uploads/offers/' + file.$ngfName;

                new Notification({
                    message: 'Изображение загружено'
                }, 'success');

                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

       

        if ($routeParams.id !== 'create-offer') {
            $scope.currentId = $routeParams.id;
            var query = {
                "_id": $scope.currentId
            };
            $scope.getData();
        } else {
            var query = {};
        };


        $scope.getClients();
        $scope.getTypes();
        $scope.getCategories();







    }]);
