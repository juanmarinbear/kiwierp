(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcAddress', cdcAddress);

  cdcAddress.$inject = [];

  /* @ngInject */
  function cdcAddress() {
    
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/core/cdcaddress/cdcaddress.html',
      link: link,
      scope: {
        address: '=',
        form: '='
      },
      controller: Controller,
      controllerAs: 'vm'
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
 
    }
  }

  Controller.$inject = ['$scope', '$filter', '$http', '$log', 'cdcloading', 'template', 'mxpostapi', 'toastr'];

  function Controller($scope, $filter, $http, $log, cdcloading, template, mxpostapi, toastr) {

    var vm = this;
    vm.address = {};
    vm.centerMap = centerMap;
    vm.form = $scope.form;
    vm.geoDistrict = geoDistrict;
    vm.geoMunicipality = geoMunicipality;
    vm.geoNumber = geoNumber;
    vm.geoStreet = geoStreet;
    vm.geoZip = geoZip;
    vm.getDistricts = getDistricts;
    vm.getMunicipalities = getMunicipalities;
    vm.getZip = getZip;
    vm.map = {
      zoom: 16,
      pan: true
    };
    vm.marker = {
      id: 0,
      options: {
        draggable: true 
      }
    };
    vm.textUrl = 'app/core/cdcaddress/language/cdcaddress.es.json';

    activate();

    function activate() {
      
      cdcloading.start();
      loadText(vm.textUrl)
      .then(loadStates)
      .then(loadAddress)
      .then(cdcloading.stop)
      .catch(function(error) {
        cdcloading.stop();
        reportError(error);
      });
    }

    function centerMap(address) {

      return mxpostapi.geoCode(address)
      .then(function(geopoint) {
        vm.address.geopoint = geopoint;
        return geopoint;
      });

    }

    function geoAddress(address) {

      cdcloading.start();
      centerMap(address)
      .then(cdcloading.stop)
      .catch(function(error) {
        var tmpAddress = {};
        angular.copy(address, tmpAddress);
        tmpAddress.district = '';
        centerMap(tmpAddress)
        .then(cdcloading.stop)
        .catch(function(error) {
          cdcloading.stop();
          reportError(error);
        });
      });

    }

    function geoDistrict(zip) {
      return mxpostapi.geoZip(zip)
      .then(function(districts) {
        if (districts.length) {
          vm.districts = districts;
          if ($scope.address.objectId) {
            vm.district = $filter('filter')(vm.districts, {name: $scope.address.district}, true)[0];
          } else {
            vm.district = districts[0];
          }
          return vm.district;
        }
        else {
          vm.form.zip.$setValidity('inexistent', false);
          throw(new Error(vm.text.zip.validation.inexistent));
        }
      });
    }

    function geoMunicipality(district) {

      return mxpostapi.getMunicipalities(district.state)
      .then(function(municipalities) {
        vm.municipalities = municipalities;
        return;
      });
    
    }

    function geoNumber(address) {

      if (address.municipality && address.street) {
        geoAddress(address);
      }

    }

    function geoStreet(address) {

      if (address.municipality) {
        geoAddress(address);
      }

    }

    function geoZip(zip) {

      vm.form.zip.$setValidity('inexistent', true);
      if (vm.form.zip.$valid) {
        cdcloading.start();
        geoDistrict(zip)
        .then(geoMunicipality)
        .then(function() {
          vm.address.state = vm.district.state;
          vm.address.municipality = vm.district.municipality;
          vm.address.district = vm.district.name;
          cdcloading.start();
          return vm.address;
        })
        .then(centerMap)
        .catch(function(error) {
          cdcloading.stop();
          reportError(error);
        });
      }
    }

    function getDistricts(address) {

      cdcloading.start();
      mxpostapi.getDistricts(address.state, address.municipality)
      .then(function(districts) {
        vm.districts = districts;
        return vm.address;
      })
      .then(centerMap)
      .then(cdcloading.stop)
      .catch(function(error) {
        cdcloading.stop();
        reportError(error);
      });

    }

    function getMunicipalities(state) {

      cdcloading.start();
      mxpostapi.getMunicipalities(state)
      .then(function(municipalities) {
        vm.municipalities = municipalities;
        vm.districts = [];
        return vm.address;
      })
      .then(centerMap)
      .then(cdcloading.stop)
      .catch(function(error) {
        cdcloading.stop();
        reportError(error);
      });

    }

    function getZip(address) {

      cdcloading.start();
      vm.address.zip = $filter('filter')(vm.districts, {name: address.district}, true)[0].zip

      centerMap(address)
      .then(cdcloading.stop)
      .catch(function(error) {
        cdcloading.stop();
        reportError(error);
      });

    }

    function loadText(url) {

      return template.get(url)
      .then(
        function(result) {
          vm.text = result;
          return;
        },
        function(error) {
          throw(new Error(error));
        });

    }

    function loadStates() {

      return mxpostapi.getStates()
      .then(function(states) {
        vm.states = states;
        return;
      });

    }

    function loadAddress() {
        
      if ($scope.address.objectId) {
        return geoDistrict($scope.address.zip)
        .then(geoMunicipality)
        .then(function() {
          vm.address = $scope.address;
          return;
        });
      }
      else {
        vm.address.geopoint = {
          __type: 'GeoPoint',
          latitude: 19.426753,
          longitude: -99.16184489999999
        };
        return;
      }

    }

    function reportError(error) {

      toastr.error(error);

    }

  }

})();
