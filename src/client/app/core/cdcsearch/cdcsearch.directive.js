(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcSearch', cdcSearch);

  cdcSearch.$inject = [];

  /* @ngInject */
  function cdcSearch() {
    
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/core/cdcsearch/cdcsearch.html',
      link: link,
      controller: Controller,
      controllerAs: 'cdcSearchVm'
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
    }
  }

  Controller.$inject = ['$scope', 'template'];

  function Controller($scope, template) {
    var cdcSearchVm = this;

    activate();

    function activate() {
      console.log('Activating cdcsearch Controller');
      template.get('app/core/cdcsearch/language/cdcsearch.es.json')
      .then(function(result) {
        cdcSearchVm.text  = result;
      }); // Loads text files.
    }
  }
})();
