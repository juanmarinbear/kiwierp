(function() {
  'use strict';

  angular
  .module('app.signin')
  .controller('Signin', Signin);

  Signin.$inject = ['$scope', 'template'];

  function Signin($scope, template) {
    var vm = this;

    activate();

    function activate() {
      console.log('Activating Signin Controller');
    }

    $scope.$on('event:google-plus-signin-success', function(event, authResult) {
      console.log('Success', authResult);
    });

    $scope.$on('event:google-plus-signin-failure', function(event, authResult) {
      console.log('Error', authResult);
    });
  }

})();
