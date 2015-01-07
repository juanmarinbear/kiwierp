(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('node', node);

  node.$inject = ['$resource', '$http'];

  /* @ngInject */
  function node($resource, $http) {

    var headers = {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': 'qxZ4gXrFxfzRdFknCokB2pfSElAWCHd3G8tIGoXI',
      'X-Parse-REST-API-Key': 'QObW916BsLBCj8rJfhJBuXM9hQh5q4qHGSaM2AbE'
    };

    var Node = $resource(
      'https://api.parse.com/1/classes/Node/:objectId',
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
      save: save
    };

    return factory;

    function destroy(node) {
    }

    function list() {
      var nodes = new Node();
      return nodes.$query();
    }

    function save(node) {
      if (node.objectId) {
        return Node.edit(node);
      } else {
        return Node.save(node);
      }
    }
  }
})();
