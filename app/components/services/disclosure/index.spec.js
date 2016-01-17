'use strict';

require('./index');

describe('disclosureApi', function() {
  var disclosureApi;

  beforeEach(angular.mock.module('disclosure'));

  beforeEach(angular.mock.inject(function(_disclosureApi_) {
    disclosureApi = _disclosureApi_;
  }));

  it('exists', function() {
    expect(disclosureApi).to.be.ok;  // jshint ignore:line
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

  it('lists some contributions', function() {
    // This hits a live API, so changes outside of this project could fail this test :(
    return disclosureApi.contributions.list()
      .then(function(contributions) {
        expect(contributions[0]).to.have.property('amount');
      });
  });
});
