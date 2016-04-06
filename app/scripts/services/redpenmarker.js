'use strict';

angular.module('redpenApp')
    .service('redPenMarkerService', function () {
        var Marker = function (posX, posY, rposX, rposY) {
            this.position = { 
                x: posX || 0, 
                y: posY || 0,
                rx: rposX || 0, 
                ry: rposY || 0};
            this.comments = [];
        };
        Marker.prototype.addComment = function(author, text){
            this.comments.push({
                author: author,
                text: text
            });            
        };
        Marker.prototype.removeComment = function (comment) {
            this.comments.splice(this.comments.indexOf(comment), 1);
        };                
        return Marker;
    });
