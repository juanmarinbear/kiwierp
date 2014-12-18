(function() {
  'use strict';

  angular
  .module('app.user')
  .config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {

    var user = {
      name: 'user',
      url: '/user',
      templateProvider: template,
      controller: 'User',
      controllerAs: 'vm'
    };

    template.$inject = ['$timeout'];

    function template($timeout) {
      return $timeout(function() {
        return '<div data-ng-include=\"\'app/user/user.html\'\"</div>';
      });
    }

    $stateProvider.state(user);
  
  }

})();
