(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('cdcloading', cdcloading);

  cdcloading.$inject = ['$rootScope', '$timeout'];

  /* @ngInject */
  function cdcloading($rootScope, $timeout) {

    var promise;
    var loading = false;

    var factory = {
      start: start,
      stop: stop
    };

    return factory;

    function start() {
      loading = true;
      $rootScope.$emit('startLoading');
      promise = $timeout(checkStatus, 5000);
    }

    function stop() {
      loading = false;
      $timeout.cancel(promise);
      $rootScope.$emit('stopLoading');
    }

    function checkStatus() {
      if(loading) {
        loading = false;
        $rootScope.$emit('stopLoading');
        throw(new Error('Request took too long, try again!'));
      }
    }

  }
})();
