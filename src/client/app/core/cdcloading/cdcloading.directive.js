(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcLoading', cdcLoading);

  cdcLoading.$inject = ['$rootScope'];

  /* @ngInject */
  function cdcLoading($rootScope) {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        active: '='
      },
      templateUrl: 'app/core/cdcloading/cdcloading.html'
    };

    return directive;

    function link(scope, element, attrs) {
      scope.loading = false;
      scope.loadingIcon = 'ion-load-a';

      $rootScope.$on('startLoading', function() {
        toggle();
      });

      $rootScope.$on('stopLoading', function() {
        toggle();
      });

      function toggle() {
        scope.loading = !scope.loading;
      }
    }
  }
})();
