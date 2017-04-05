'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('MainCtrl', ['$scope', '$stamplay', function ($scope, $stamplay) {


      

        var query = {
            client: 'Провиант'
        };

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


        /* $stamplay.User.currentUser()
            .then(function (res) {
                // success

                $scope.userName = res.user.displayName;
                console.log($scope.userName);

            });
        */

    }]);
