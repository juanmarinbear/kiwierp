(function() {
  'use strict';

  angular
  .module('app.signin')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var signin = {
      name: 'signin',
      url: '/signin',
      templateProvider: template,
      controller: 'Signin',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/signin/signin.html\'\"</div>';
      });
    }

    $stateProvider.state(signin);
  
  }

})();
