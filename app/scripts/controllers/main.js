'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('MainCtrl', ['$scope', '$stamplay', 'ModalService', 'moment', function ($scope, $stamplay, ModalService, moment) {

        $scope.close = function (result) {
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };



        $scope.getObjects = function () {
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

        $scope.sendLike = function (id) {
            $stamplay.Object("offers").get({
                    "_id": id
                })
                .then(function (res) {
                    // success
                    var likes = res.data[0].likes += 1;
                    var data = {
                        "likes": likes
                    };
                    $stamplay.Object("offers").patch(id, data)
                        .then(function (res) {
                            // success
                            console.log(res)
                            $scope.getObjects();
                        }, function (err) {
                            // error
                            console.log(res)
                        });
                }, function (err) {
                    // error
                    console.log(err);
                });
        };

        $scope.show = function () {
            ModalService.showModal({
                templateUrl: 'views/login.html',
                controller: "LoginCtrl"
            }).then(function (modal) {
                modal.element.modal();
                modal.close.then(function (result) {
                    $scope.message = "You said " + result;
                });
            });
        };

        $scope.getObjects();

        $scope.today = moment();
        
        $scope.checkDate = function(start, end) {
            var today = moment();
            return moment(today).isBetween(start, end);
            
            
        }
        


        /* $stamplay.User.currentUser()
            .then(function (res) {
                // success

                $scope.userName = res.user.displayName;
                console.log($scope.userName);

            });
        */

    }]);
