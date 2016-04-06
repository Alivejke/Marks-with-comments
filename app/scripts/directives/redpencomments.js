'use strict';

angular.module('redpenApp')
    .directive('redPenComments', redPenCommentsDirective);

function redPenCommentsDirective() {
    return {
        scope: {
            marker: '='
        },
        templateUrl: 'views/comments.html',
        restrict: 'E',
        controllerAs: 'ctrl',
        controller: redPenCommentsDirectiveController
    };
};

redPenCommentsDirectiveController.$inject = ['$scope', '$element', '$attrs'];

function redPenCommentsDirectiveController($scope, $element, $attrs) {
    var vm = this;
    vm.marker = $scope.marker;
    vm.comments = $scope.marker.comments;
    vm.comment = undefined;
    // post comment
    vm.postComment = function () {
        vm.marker.addComment('Shuhratbek', vm.comment);
        vm.comment = undefined;
    };
    // remove comment
    vm.removeComment = function (comment) {
      vm.marker.removeComment(comment)  
    };
    // add required listeners                                
    var addListeners = function () {
        $element.on('click', onElementClick);
    };
    // remove all listeners
    var removeListeners = function () {
        $element.off('click', onElementClick);
    };
    // click event trigger
    var onElementClick = angular.bind(vm, function onElementClick(event) {
        event.stopPropagation();
    });
    // init listeners
    addListeners();
    // destroy all listeners
    $scope.$on('$destroy', removeListeners);
};    
