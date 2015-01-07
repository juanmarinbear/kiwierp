(function() {
  'use strict';

  angular
  .module('app.node')
  .controller('Node', Node);

  Node.$inject = ['$scope', '$resource', '$http', 'template', 'toastr', 'node'];

  function Node($scope, $resource, $http, template, toastr, node) {

    var vm = this;
    vm.node = {};
    vm.forms = {};
    vm.cancel = cancel;
    vm.destroy = destroy;
    vm.edit = edit;
    vm.editable = false;
    vm.reset = reset;
    vm.toggleEditable = toggleEditable;
    vm.save = save;

    activate();

    function activate() {

      template.get('app/node/language/node.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(function() {
        $scope.$emit('startLoading');
        listNodes();
      });
    }

    function cancel() {

      vm.node = {};
      toggleEditable();

    }

    function destroy(n) {

      $scope.$emit('startLoading');
      node.destroy(n)
      .then(
        function(response) {
          toastr.success(vm.text.actions.destroy.success);
          listNodes();
        },
        function(error) {
          toastr.success(vm.text.actions.destroy.error);
          console.log(error);
          $scope.$emit('stopLoading');
        });

    }

    function edit(n) {

      vm.node = n;
      toggleEditable();

    }

    function listNodes() {

      node.list()
      .then(
        function(response) {
          vm.nodes = response.results;
          $scope.$emit('stopLoading');
        },
        function(error) {
          console.log(error);
          $scope.$emit('stopLoading');
        });

    }

    function reset(n) {
      
      $scope.$emit('startLoading');
      node.reset(n)
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

    function save(n) {

      $scope.$emit('startLoading');
      node.save(n)
      .$promise
      .then(
        function(response) {
          console.log(response);
          toastr.success(vm.text.actions.save.success);
          listNodes();
          $scope.$emit('stopLoading'); // Remove this
          cancel();
        },
        function(error) {
          console.log(error)
          toastr.error(vm.text.actions.save.error);
          $scope.$emit('stopLoading');
        });

    }

    function toggleEditable() {

      vm.editable = !vm.editable; 

    }
  }

})();
