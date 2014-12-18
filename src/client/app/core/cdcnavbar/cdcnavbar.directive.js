(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcNavbar', cdcNavbar);

  cdcNavbar.$inject = [];

  /* @ngInject */
  function cdcNavbar() {
    
    var directive = {
      link: link,
      restrict: 'EA',
      scope: {
        toggleSidebar: '&onToggle' 
      },
      templateUrl: 'app/core/cdcnavbar/cdcnavbar.html'
    };

    return directive;

    function link(scope, element, attrs) {
    }
  }
})();
