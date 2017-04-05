'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
  .controller('AboutCtrl', function ($scope, $stamplay) {

    $stamplay.User.currentUser()
            .then(function (res) {
                // success

                $scope.userName = res.user.displayName;
                console.log($scope.userName);
            });
  });
