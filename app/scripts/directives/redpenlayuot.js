'use strict';

angular.module('redpenApp')
    .directive('redPenLayout', redPenLayoutDirective);

function redPenLayoutDirective() {
    return {
        restrict: 'A',
        controllerAs: 'ctrl',
        controller: redPenLayoutDirectiveController,
        link: redPenLayoutDirectiveLink
    };
};

redPenLayoutDirectiveController.$inject = ['$scope', '$element', '$attrs', '$window', 'redPenMarkersService'];

function redPenLayoutDirectiveController($scope, $element, $attrs, $window, redPenMarkers) {
    // this value defines offset to the central point of the 
    // marker. in production version it is requered to implement
    // provider to configure initial marker parameters 
    var MARKER_CENTER_OFFSET = 12;
    var vm = this;
    // calculate marker absolulte position according to its relative coordinates
    vm.getMarkerAbsolutePosition = function (rX, rY) {
        var dX = $element[0].clientWidth / vm.initialSize.width;
        var dY = $element[0].clientHeight / vm.initialSize.height;
        return {
            x: rX / dX + MARKER_CENTER_OFFSET,
            y: rY / dY + MARKER_CENTER_OFFSET
        }
    };
    // calculate marker relative position according to its absolute coordinates
    vm.getMarkerRelativePosition = function (x, y) {
        var dX = $element[0].clientWidth / vm.initialSize.width;
        var dY = $element[0].clientHeight / vm.initialSize.height;
        return {
            x: x * dX - MARKER_CENTER_OFFSET,
            y: y * dY - MARKER_CENTER_OFFSET
        }
    };
    // update all markers position due to container resize
    vm.updateMarkersRelativePosition = function () {
        vm.markers.forEach(function (marker) {
            var relativePosition = this.getMarkerRelativePosition(marker.position.x, marker.position.y);
            marker.position.rx = relativePosition.x;
            marker.position.ry = relativePosition.y;
        }.bind(vm));
    }
    //element absolute coordinates
    vm.absoluteContainerPosition = {
        x: 0,
        y: 0
    };
    // element initial size
    vm.initialSize = {
        width: 0,
        height: 0
    };
    // link to markers object
    vm.markers = redPenMarkers.markers;
    // load image. It is required to save actual image size to deal
    // with markers relative coordinates to do this get image size
    // before append to DOM
    vm.image = new Image();
    vm.image.onload = function () {
        this.initialSize.width = this.image.width;
        this.initialSize.height = this.image.height;
        $element.append(vm.image);
        this.setAbsoluteContainerPosition($element);
    }.bind(vm);
    vm.image.src = $attrs.imageSrc;
    // get offset of the DOM element according to window
    var offset = function (el) {
        var rawDom = el[0],
            body = document.documentElement || document.body,
            scrollX = window.pageXOffset || body.scrollLeft,
            scrollY = window.pageYOffset || body.scrollTop,
            _x = rawDom.getBoundingClientRect().left + scrollX,
            _y = rawDom.getBoundingClientRect().top + scrollY;
        return { left: _x, top: _y };
    };
    // save absolute element position                                
    vm.setAbsoluteContainerPosition = function (element) {
        var currentPosition = offset(element);
        vm.absoluteContainerPosition.x = currentPosition.left;
        vm.absoluteContainerPosition.y = currentPosition.top;
    };
    // calculate relative coordinated of mouse cursor according
    // to absolute element position
    vm.getRelativeCoordinates = function (absX, absY) {
        return {
            x: absX - MARKER_CENTER_OFFSET - vm.absoluteContainerPosition.x,
            y: absY - MARKER_CENTER_OFFSET - vm.absoluteContainerPosition.y
        }
    };
    // crossbrowser cursor position calculation
    var getCursorPosition = function (e) {
        var posx = 0,
            posy = 0;
        if (!e) var e = window.event;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x: posx, y: posy }
    };
    // add required listeners                                
    var addListeners = function () {
        $window.addEventListener('resize', onWindowResize);
        $element.on('click', onElementClick);
        $element.on('mouseenter', onElementMouseEnter);
        $element.on('mouseleave', onElementMouseLeave);
    };
    // remove all listeners
    var removeListeners = function () {
        $window.removeEventListener('resize', onWindowResize);
        $element.off('click', onElementClick);
        $element.off('mouseenter', onElementMouseEnter);
        $element.off('mouseleave', onElementMouseLeave);
    };
    // mouse enter event trigger
    var onElementMouseEnter = angular.bind(vm, function onElementMouseEnter() {
        $scope.showMarkers = true;
        $scope.$apply();
    });
    // mouse leave event trigger
    var onElementMouseLeave = angular.bind(vm, function onElementMouseLeave() {
        $scope.showMarkers = false;
        $scope.$apply();
    });
    // window resize event trigger
    var onWindowResize = function () {
        this.setAbsoluteContainerPosition($element);
        this.updateMarkersRelativePosition();
        $scope.$apply();
    }.bind(vm);
    // mouse click event trigger
    var onElementClick = function (event) {
        var cursorPosition = this.getRelativeCoordinates(getCursorPosition(event).x, getCursorPosition(event).y),
            absoluteMarkerPosition = this.getMarkerAbsolutePosition(cursorPosition.x, cursorPosition.y);
        redPenMarkers.addMarker(absoluteMarkerPosition.x, absoluteMarkerPosition.y, cursorPosition.x, cursorPosition.y);
        $scope.$apply();
    }.bind(vm);
    // init listeners
    addListeners();
    // destroy all listeners
    $scope.$on('$destroy', removeListeners);
};

redPenLayoutDirectiveLink.$inject = ['$scope', '$element', '$attrs'];

function redPenLayoutDirectiveLink(scope, element, attrs) {
    scope.ctrl.setAbsoluteContainerPosition(element);
};