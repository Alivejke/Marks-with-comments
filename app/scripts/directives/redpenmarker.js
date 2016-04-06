'use strict';

angular.module('redpenApp')
    .directive('redPenMarker', redPenMarkerDirective);

function redPenMarkerDirective() {
    return {
        restrict: 'A',
        controllerAs: 'ctrl',
        controller: redPenMarkerDirectiveController
    };
};

redPenMarkerDirectiveController.$inject = ['$scope', '$element', '$attrs'];

function redPenMarkerDirectiveController($scope, $element, $attrs) {
    var vm = this;
    // store current marker in controller
    vm.marker = $scope.marker;
    // store current marker position
    vm.markerPosition = $scope.marker.position;
    // update x position of the element
    vm.setElementPositionX = function (val) {
        $element[0].style.left = (val || 0) + 'px';
    };
    // update y position of the element
    vm.setElementPositionY = function (val) {
        $element[0].style.top = (val || 0) + 'px';
    };
    // add required listeners                                
    var addListeners = function () {
        $element.on('mouseenter', onElementMouseEnter);
        $element.on('mouseleave', onElementMouseLeave);
    };
    // remove all listeners
    var removeListeners = function () {
        $element.off('mouseenter', onElementMouseEnter);
        $element.off('mouseleave', onElementMouseLeave);
    };
    // mouse enter event trigger
    var onElementMouseEnter = angular.bind(vm, function onElementMouseEnter() {
        this.showComments = true;
        $scope.$apply();
    });
    // mouse leave event trigger
    var onElementMouseLeave = angular.bind(vm, function onElementMouseLeave() {
        this.showComments = false;
        $scope.$apply();
    });
    // function watcher for changes of marker position
    var getCurrentMarkerPosition = angular.bind(vm, function getCurrentMarkerPosition() {
        return vm.markerPosition;
    });
    // update element position
    var updateElementPosition = angular.bind(vm, function updateElementPosition(val) {
        this.setElementPositionX(val.rx);
        this.setElementPositionY(val.ry);
    });
    // watch for position changing
    $scope.$watch(getCurrentMarkerPosition, updateElementPosition, true);
    // init listeners
    addListeners();
    // destroy all listeners
    $scope.$on('$destroy', removeListeners);
};