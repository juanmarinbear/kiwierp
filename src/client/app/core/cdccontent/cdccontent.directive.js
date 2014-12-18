(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcContent', cdcContent);

  cdcContent.$inject = [];

  /* @ngInject */
  function cdcContent() {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        active: '='
      },
      templateUrl: 'app/core/cdccontent/cdccontent.html'
    };

    return directive;

    function link(scope, element, attrs) {
    }
  }
})();
