(function() {
  'use strict';

  angular
  .module('app')
  .controller('App', App);

  App.$inject = [];

  function App() {
    var vm = this;

    vm.sidebarActive = true;
    vm.toggleSidebar = toggleSidebar;

    activate();

    function activate() {
      console.log('Activating App Controller');
    }

    function toggleSidebar() {
      vm.sidebarActive = !vm.sidebarActive;
    }
  }

})();
