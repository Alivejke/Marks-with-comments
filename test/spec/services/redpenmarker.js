'use strict';

describe('Service: redPenMarker', function () {

  // load the service's module
  beforeEach(module('redpenApp'));

  // instantiate service
  var redPenMarker;
  beforeEach(inject(function (_redPenMarker_) {
    redPenMarker = _redPenMarker_;
  }));

  it('should do something', function () {
    expect(!!redPenMarker).toBe(true);
  });

});
