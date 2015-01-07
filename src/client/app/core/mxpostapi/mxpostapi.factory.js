(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('mxpostapi', mxpostapi);

  mxpostapi.$inject = ['$resource', '$http'];

  /* @ngInject */
  function mxpostapi($resource, $http) {

    var headers = {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': 'K6fafnegdVE32PXOMrOELlS70ZHxLqcHiQTA8Tq6',
      'X-Parse-REST-API-Key': 'g15AcAKamIKsgxE4nqtA2KlSMc5Tk8rdkq0l1ZYl'
    };

    var Mxpostapi = $resource(
      'https://api.parse.com/1/classes/:class/:objectId',
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

    var googleMapsRequest = {
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json',
      params: {
        key: 'AIzaSyDpLqDvuOv11c-Wxh_CJCQTAjK72-xdybo',
        region: 'mx'
      }
    };

    var factory = {
      getDistricts: getDistricts,
      getMunicipalities: getMunicipalities,
      getStates: getStates,
      geoCode: geoCode,
      geoZip: geoZip
    };

    return factory;

    function formatAddress(address) {

      return [
        address.street,
        address.number,
        address.district,
        address.municipality,
        address.state,
        address.zip
      ].join();

    }


    function getDistricts(state, municipality) {
      return Mxpostapi.query({
        class: 'Districts',
        where: {
          state: state,
          municipality: municipality
        },
        limit: '1000',
        order: 'name'
      })
      .$promise
      .then(
        function(response) {
          return response.results;
        },
        function(error) {
          throw(new Error(error));
        }
      );
    }

    function getMunicipalities(state) {
      return Mxpostapi.query({
        class: 'Municipalities',
        where: {
          state: state 
        },
        limit: '1000',
        order: 'name'
      })
      .$promise
      .then(
        function(response) {
          return response.results;
        },
        function(error) {
          throw(new Error(error));
        }
      );
    }

    function getStates() {
      return Mxpostapi.query({
        class: 'States',
        order: 'name'
      })
      .$promise
      .then(
        function(response) {
          return response.results;
        },
        function(error) {
          throw(new Error(error));
        }
      );
    }

    function geoZip(zip) {
      return Mxpostapi.query({
        class: 'Districts',
        where: {
          zip: zip 
        }
      })
      .$promise
      .then(
        function(response) {
          return response.results;
        },
        function(error) {
          throw(new Error(error));
        }
      );
    }

    function geoCode(address) {

      var request = angular.copy(googleMapsRequest);
      request.params.address = formatAddress(address);
      console.log(request.params.address);
      return $http(request)
      .then(
        function(response) {
          if (response.data.results.length) {
            return {
              latitude: response.data.results[0].geometry.location.lat,
              longitude: response.data.results[0].geometry.location.lng,
            } 
          }
          else {
            throw(new Error(response.data.status));
          }
        },
        function(error) {
          throw(new Error(error));
        }
      )

    }
  }
})();
