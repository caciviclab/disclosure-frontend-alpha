/*jshint expr: true*/

'use strict';

require('./index');

describe('disclosureApi', function() {
  var disclosureApi;

  beforeEach(angular.mock.module('disclosure'));

  beforeEach(angular.mock.inject(function(_disclosureApi_) {
    disclosureApi = _disclosureApi_;
  }));

  it('exists', function() {
    expect(disclosureApi).to.be.ok;
  });

  it('has contributions', function() {
    expect(disclosureApi).to.have.property('contributions');
  });

  it('has elections', function() {
    expect(disclosureApi).to.have.property('elections');
  });

  it('has locations', function() {
    expect(disclosureApi).to.have.property('locations');
  });

  it('has search', function() {
    expect(disclosureApi).to.have.property('search');
  });


  // locality.search
  it('get a locality via search', function() {
    // Search for any locality
    disclosureApi.search.get({q: ''})
      .then(function(localities) {
        localities.each(function(locality) {
          expect(locality).to.have.property('name');
          expect(locality).to.have.property('id');
        });
      });
  });

});
