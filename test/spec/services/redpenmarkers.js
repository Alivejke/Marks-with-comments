'use strict';

describe('Service: redPenMarkers', function () {

  // load the service's module
  beforeEach(module('redpenApp'));

  // instantiate service
  var redPenMarkers;
  beforeEach(inject(function (_redPenMarkers_) {
    redPenMarkers = _redPenMarkers_;
  }));

  it('should do something', function () {
    expect(!!redPenMarkers).toBe(true);
  });

});
