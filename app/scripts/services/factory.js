'use strict';

/**
 * @ngdoc service
 * @name resdokWebApp.factory
 * @description
 * # factory
 * Factory in the resdokWebApp.
 */
angular.module('resdokWebApp')
  .factory('factory', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
