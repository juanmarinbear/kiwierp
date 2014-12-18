(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcUser', cdcUser);

  cdcUser.$inject = [];

  /* @ngInject */
  function cdcUser() {
    
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/core/cdcuser/cdcuser.html',
      link: link,
      scope: {
        user: '=',
        form: '='
      },
      controller: Controller,
      controllerAs: 'cdcUserVm'
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
    }
  }

  Controller.$inject = ['$scope', 'template'];

  function Controller($scope, template) {
    var cdcUserVm = this;

    activate();

    function activate() {
      console.log('Activating cdcuser Controller');
      template.get('app/core/cdcuser/language/cdcuser.es.json')
      .then(function(result) {
        cdcUserVm.text  = result;
      }); // Loads text files.
    }
  }
})();
