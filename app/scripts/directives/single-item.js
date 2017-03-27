'use strict';

/**
 * @ngdoc directive
 * @name resdokWebApp.directive:singleItem
 * @description
 * # singleItem
 */
angular.module('resdokWebApp')
  .directive('singleItem', function () {
    return {
      template: '<div>test</div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the singleItem directive');
      }
    };
  });
