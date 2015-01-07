(function() {
  'use strict';

  angular
  .module('app.core')
  .directive('cdcNode', cdcNode);

  cdcNode.$inject = [];

  /* @ngInject */
  function cdcNode() {
    
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/core/cdcnode/cdcnode.html',
      link: link,
      scope: {
        node: '=',
        form: '='
      },
      controller: Controller,
      controllerAs: 'cdcNodeVm'
    };

    return directive;

    function link(scope, element, attrs, ctrl) {
    }
  }

  Controller.$inject = ['$scope', '$filter', '$http', 'template', 'mxpostapi', 'toastr', 'uiGmapIsReady'];

  function Controller($scope, $filter, $http, template, mxpostapi, toastr, uiGmapIsReady) {

    var cdcNodeVm = this;
    cdcNodeVm.centerMap = centerMap;
    cdcNodeVm.geoZip = geoZip;
    cdcNodeVm.getDistricts = getDistricts;
    cdcNodeVm.getMunicipalities = getMunicipalities;
    cdcNodeVm.getZip = getZip;
    $scope.node.levels = '2';
    cdcNodeVm.map = {
      center: {
        latitude: 19.426753,
        longitude: -99.16184489999999
      },
      zoom: 16,
      pan: true
    };
    cdcNodeVm.marker = {
      id: 0,
      coords: {
        latitude: 19.426753,
        longitude: -99.16184489999999
      },
      options: {
        draggable: true 
      }
    };

    activate();

    function activate() {

      $scope.$emit('startLoading');
      console.log('Activating cdcnode Controller');

      template.get('app/core/cdcnode/language/cdcnode.es.json')
      .then(function(result) {
        cdcNodeVm.text  = result;
      })
      .then(mxpostapi.getStates()
      .$promise
      .then(function(data) {
        cdcNodeVm.states = data.results;
        uiGmapIsReady
        .promise()
        .then(
          function(instances) {
            $scope.$emit('stopLoading');
            if($scope.node.objectId) {
              var tmpNode = {};
              angular.copy(tmpNode, $scope.node);
              geoZip($scope.node.zip)
              .then(function() {
                $scope.node = tmpNode; 
              });
            }
          },
          function(error) {
            $scope.$emit('stopLoading');
          }
        );
      }));

    }

    function centerMap(address) {

      mxpostapi.geoCode(address)
      .then(
        function(response) {
          cdcNodeVm.map.center.latitude = response.data.results[0].geometry.location.lat;
          cdcNodeVm.map.center.longitude = response.data.results[0].geometry.location.lng;
          $scope.node.geopoint = {
            __type: 'GeoPoint',
            latitude: cdcNodeVm.map.center.latitude,
            longitude: cdcNodeVm.map.center.longitude
          };
          cdcNodeVm.marker.coords = cdcNodeVm.map.center;
        },
        function(error) {
          toastr.error(cdcNodeVm.text.geopoint.validation.error);
          console.log(error);
        }
      );

    }

    function geoZip(zip) {

      $scope.form.zip.$setValidity('inexistent', true);
      if ($scope.form.zip.$invalid) {
        return; 
      }
      $scope.$emit('startLoading');
      return mxpostapi.geoZip(zip)
      .$promise
      .then(function(data) {
        cdcNodeVm.districts = data.results;
        if (!cdcNodeVm.districts.length) {
          toastr.error(cdcNodeVm.text.zip.validation.inexistent);
          $scope.form.zip.$setValidity('inexistent', false);
          $scope.$emit('stopLoading');
        } else {
          $scope.form.zip.$setValidity('inexistent', true);
          cdcNodeVm.district = data.results[0];
          mxpostapi.getMunicipalities(cdcNodeVm.district.state)
          .$promise
          .then(function(data) {
            cdcNodeVm.municipalities = data.results;
            $scope.node.street = null;
            $scope.node.number = null;
            $scope.node.apt = null;
            $scope.node.state = cdcNodeVm.district.state;
            $scope.node.municipality = cdcNodeVm.district.municipality;
            $scope.node.district = cdcNodeVm.district.name;
            $scope.$emit('stopLoading');
            centerMap($scope.node);
          });
        }
      });

    }

    function getDistricts(state, municipality) {

      $scope.$emit('startLoading');
      mxpostapi.getDistricts(state, municipality)
      .$promise
      .then(function(data) {
        cdcNodeVm.districts = data.results;
        $scope.node.district = null;
        $scope.node.zip = null;
        $scope.$emit('stopLoading');
        centerMap($scope.node);
      });

    }

    function getMunicipalities(state) {

      $scope.$emit('startLoading');
      mxpostapi.getMunicipalities(state)
      .$promise
      .then(function(data) {
        cdcNodeVm.municipalities = data.results;
        cdcNodeVm.districts = [];
        $scope.node.municipality = null;
        $scope.node.district = null;
        $scope.node.zip = null;
        $scope.$emit('stopLoading');
        centerMap($scope.node);
      });

    }

    function getZip(district) {
      cdcNodeVm.district = $filter('filter')(cdcNodeVm.districts, {name: district}, true)[0];
      $scope.node.zip = cdcNodeVm.district.zip;
      centerMap($scope.node);
    }
  }
})();
