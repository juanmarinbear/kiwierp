(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('user', user);

  user.$inject = ['$resource', '$http'];

  /* @ngInject */
  function user($resource, $http) {

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

    var factory = {
      destroy: destroy,
      list: list,
      reset: reset,
      save: save
    };

    return factory;

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

    function destroy(u) {
      var request = {
        method: 'POST',
        url: 'https://api.parse.com/1/functions/deleteUser',
        headers: headers,
        data: u
      };

      return $http(request);
    }

    function reset(u) {
      var request = {
        method: 'POST',
        url: 'https://api.parse.com/1/functions/resetPassword',
        headers: headers,
        data: u
      };

      return $http(request);
    }

    function list() {
      var users = new User();
      return users.$query();
    }

    function save(u) {

      if (u.objectId) {
        var request = {
          method: 'POST',
          url: 'https://api.parse.com/1/functions/editUser',
          headers: headers,
          data: u
        };
        
        return $http(request);

      } else {

        var user = new User(u);
        user.password = Math.random().toString(36).slice(-8);

        return user.$save();
      }
    }
  }
})();
