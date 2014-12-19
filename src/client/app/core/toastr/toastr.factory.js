(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('toastr', toastr);

  toastr.$inject = ['$window'];

  /* @ngInject */
  function toastr($window) {
    return $window.toastr;
  }
})();
