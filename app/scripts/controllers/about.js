'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('AboutCtrl', ['$scope', '$stamplay', '$routeParams', function ($scope, $stamplay, $routeParams) {
        $scope.currentId = $routeParams.id;
        $scope.currentCompany = $routeParams.company;
        $stamplay.Object("offers").get({
                '_id': $scope.currentId
            })
            .then(function (res) {
                // success
                $scope.$apply(function () {
                    $scope.offers = res.data[0];
                });

                console.log($scope.offers);

            }, function (err) {
                // error
                console.log(err);
            });
    }]);
