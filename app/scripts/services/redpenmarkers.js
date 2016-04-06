'use strict';

angular.module('redpenApp')
    .service('redPenMarkersService', ['redPenMarkerService', function (RedPenMarker) {
        var Markers = function () {
            this.markers = [];
        };
        Markers.prototype.addMarker = function (posX, posY, rposX, rposY) {
            this.markers.push(new RedPenMarker(posX, posY, rposX, rposY));
        };
        return new Markers();
    }]);
