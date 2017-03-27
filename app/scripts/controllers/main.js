'use strict';

/**
 * @ngdoc function
 * @name resdokWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the resdokWebApp
 */
angular.module('resdokWebApp')
  .controller('MainCtrl', function ($scope, $stamplay) {
    var user = $stamplay.User
	var data = {
	    "header":"test",
	    "desr":"test"
	}
	
    $stamplay.Object('foo').get().then(function(result){
	//manage the result
        console.log(result);
},function(error){
	console.log(error);
})
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
