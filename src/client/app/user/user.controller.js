(function() {
  'use strict';

  angular
  .module('app.user')
  .controller('User', User);

  User.$inject = ['$scope', '$resource', '$http', 'template', 'user'];

  function User($scope, $resource, $http, template, user) {
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

    var headers = {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': 'qxZ4gXrFxfzRdFknCokB2pfSElAWCHd3G8tIGoXI',
      'X-Parse-REST-API-Key': 'QObW916BsLBCj8rJfhJBuXM9hQh5q4qHGSaM2AbE'
    };

    var User = $resource(
      'https://api.parse.com/1/users/:objectId',
      {
        objectId: '@objectId' 
      },
      { 
        'get':    {method:'GET', headers: headers},
        'save':   {method:'POST', headers: headers},
        'edit':   {method:'PUT', headers: headers},
        'query':  {method:'GET', headers: headers},
        'remove': {method:'DELETE', headers: headers},
        'delete': {method:'DELETE', headers: headers} 
      }
    );

    activate();

    function activate() {
      template.get('app/user/language/user.es.json')
      .then(function(result) {
        vm.text = result;
      })
      .then(function() {
        listUsers();
      });
    }

    function cancel() {
      vm.user = {};
      vm.form.$setPristine();
      toggleEditable();
    }

    function destroy(u) {
      
      user.destroy(u)
      .then(
        function(response) {
          console.log(response);
          listUsers();
        },
        function(error) {
          console.log(error);
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
          vm.users = response.results;
        },
        function(error) {
          console.log(error);
        });
    }

    function reset(u) {
      
      user.reset(u)
      .then(
        function(response) {
          console.log(response);
        },
        function(error) {
          console.log(error);
        });
    }

    function save(u) {

      user.save(u)
      .then(
        function(response) {
          console.log(response);
          listUsers();
          cancel();
        },
        function(error) {
          console.log(error);
        });
    }

    function toggleEditable() {
      vm.editable = !vm.editable; 
    }
  }

})();
