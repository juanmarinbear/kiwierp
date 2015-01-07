(function() {
  'use strict';

  angular
  .module('app')
  .config(config);

  config.$inject = ['$urlRouterProvider', 'uiGmapGoogleMapApiProvider'];

  function config($urlRouterProvider, uiGmapGoogleMapApiProvider) {

    $urlRouterProvider.otherwise('/node');

    uiGmapGoogleMapApiProvider.configure({
        v: '3.17',
        key: 'AIzaSyDpLqDvuOv11c-Wxh_CJCQTAjK72-xdybo',
        libraries: 'weather, geometry, visualization'
    });
  }

})();
