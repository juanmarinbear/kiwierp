(function() {
  'use strict';

  angular
  .module('app.node')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var node = {
      name: 'node',
      url: '/node',
      templateProvider: template,
      controller: 'Node',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/node/node.html\'\"</div>';
      });
    }

    $stateProvider.state(node);
  
  }

})();
