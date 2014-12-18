(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcSidebar', cdcSidebar);

  cdcSidebar.$inject = [];

  /* @ngInject */
  function cdcSidebar() {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        active: '=' 
      },
      templateUrl: 'app/core/cdcsidebar/cdcsidebar.html'
    };

    return directive;

    function link(scope, element, attrs) {
    }
  }
})();
