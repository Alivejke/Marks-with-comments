'use strict';

describe('Directive: redPenComments', function () {

  // load the directive's module
  beforeEach(module('redpenApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<red-pen-comments></red-pen-comments>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the redPenComments directive');
  }));
});
