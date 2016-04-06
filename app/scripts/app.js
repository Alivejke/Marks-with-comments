'use strict';

angular
  .module('redpenApp', ['ngMaterial']);

angular.module('redpenApp').config(['$mdIconProvider', function ($mdIconProvider) {
    $mdIconProvider.icon('marker', 'content/icons/map-marker-circle.svg');
}])