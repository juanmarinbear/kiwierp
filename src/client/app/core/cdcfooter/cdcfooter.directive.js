(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcFooter', cdcFooter);

  cdcFooter.$inject = [];

  /* @ngInject */
  function cdcFooter() {
    
    var directive = {
      link: link,
      restrict: 'EA',
      templateUrl: 'app/core/cdcfooter/cdcfooter.html'
    };

    return directive;

    function link(scope, element, attrs) {
    }
  }
})();
