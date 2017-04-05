'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
    .controller('AdminCtrl', function ($scope, $stamplay) {

        var data = {
            "header": "test",
            "desr": "test"
        };

        
       //  $stamplay.User.socialLogin("auth0") ;  
    
        $stamplay.User.currentUser()
            .then(function (res) {
                // success

                $scope.userName = res.user.displayName;
                console.log($scope.userName);
            
            });

        $scope.loggout = function () {


            if ($stamplay.User.currentUser()) {

                $stamplay.User.logout(true, function (err, res) {
                    console.log(res);
                });

            }
        };

        $scope.credential = {
            email: '',
            password: ''
        };

        $scope.loggin = function () {
            $stamplay.User.login($scope.credential)
                .then(function (res) {
                    // success
                    console.log(res)
                }, function (err) {
                    // error  
                    console.log(err);
                });
        };

   

    
    });
