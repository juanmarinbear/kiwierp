(function() {
  'use strict';

  angular
  .module('app.user')
  .controller('User', User);

  User.$inject = ['$scope', 'template', 'toastr', 'user'];

  function User($scope, template, toastr, user) {

    var vm = this;
    vm.user = {};
    vm.form = {};
    vm.cancel = cancel;
    vm.destroy = destroy;
    vm.edit = edit;
    vm.editable = false;
    vm.reset = reset;
    vm.toggleEditable = toggleEditable;
    vm.save = save;

    activate();

    function activate() {

      template.get('app/user/language/user.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(function() {
        $scope.$emit('startLoading');
        listUsers();
      });
    }

    function cancel() {

      vm.user = {};
      vm.form.$setPristine();
      toggleEditable();

    }

    function destroy(u) {

      $scope.$emit('startLoading');
      user.destroy(u)
      .then(
        function(response) {
          toastr.success(vm.text.actions.destroy.success);
          listUsers();
        },
        function(error) {
          toastr.success(vm.text.actions.destroy.error);
          console.log(error);
          $scope.$emit('stopLoading');
        });

    }

    function edit(u) {

      vm.user = u;
      vm.form.$setDirty();
      toggleEditable();

    }

    function listUsers() {

      user.list()
      .then(
        function(response) {
          toastr.success(vm.text.actions.list.success);
          vm.users = response.results;
          $scope.$emit('stopLoading');
        },
        function(error) {
          toastr.error(vm.text.actions.list.error);
          console.log(error);
          $scope.$emit('stopLoading');
        });

    }

    function reset(u) {
      
      $scope.$emit('startLoading');
      user.reset(u)
      .then(
        function(response) {
          toastr.success(vm.text.actions.reset.success);
          $scope.$emit('stopLoading');
        },
        function(error) {
          toastr.error(vm.text.actions.reset.error);
          console.log(error);
          $scope.$emit('stopLoading');
        });

    }

    function save(u) {

      $scope.$emit('startLoading');
      user.save(u)
      .then(
        function(response) {
          toastr.success(vm.text.actions.save.success);
          listUsers();
          cancel();
        },
        function(error) {
          toastr.error(vm.text.actions.error.success);
          $scope.$emit('stopLoading');
        });

    }

    function toggleEditable() {

      vm.editable = !vm.editable; 

    }
  }

})();
