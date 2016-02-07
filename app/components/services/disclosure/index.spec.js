/*jshint expr: true*/

'use strict';

require('./index');

describe('disclosureApi', function() {
  var disclosureApi;

  beforeEach(angular.mock.module('disclosure'));

  beforeEach(angular.mock.inject(function(_disclosureApi_) {
    disclosureApi = _disclosureApi_;
  }));


  // locality.search
  it('get a locality', function() {
    // Search for any locality
    disclosureApi.locality.search({q: ''})
      .then(function(localities) {
        localities.each(function(locality) {
          expect(locality).to.have.property('name');
          expect(locality).to.have.property('type');
          expect(locality).to.have.property('id');
        });
      });
  });

  // locality.current_ballot
  it('get a ballot', function() {
    // Search for any locality
    disclosureApi.locality.search({q: ''})
      .then(function(localities) {
        // Get the current ballot for the first locality
        var locality = localities[0];
        disclosureApi.locality.current_ballot({locality_id: locality.id})
          .then(function(ballot) {
            expect(ballot).to.have.property('locality_id');
            expect(ballot).to.have.property('ballot_id');
            expect(ballot).to.have.property('ballot_items');
          });
      });
  });

  // office_election.get
  it('get an office election', function() {
    // Search for any locality
    disclosureApi.locality.search({q: ''})
      .then(function(localities) {
        // Get the current ballot for the first locality
        var locality = localities[0];
        disclosureApi.locality.current_ballot({locality_id: locality.id})
          .then(function(ballot) {
            // Get the office election details from the ballot
            disclosureApi.office_election.get({ballot_id: ballot.ballot_id})
              .then(function(officeElection) {
                expect(officeElection).to.have.property('candidates');
              });
          });
      });
  });

  // candidate.get
  it('get a candidate', function() {
    // Search for any locality
    disclosureApi.locality.search({q: ''})
      .then(function(localities) {
        // Get the current ballot for the first locality
        var locality = localities[0];
        disclosureApi.locality.current_ballot({locality_id: locality.id})
          .then(function(ballot) {
            // Get the office election details from the ballot
            disclosureApi.office_election.get({ballot_id: ballot.ballot_id})
              .then(function(officeElection) {
                // Get details from the first candidate.
                var candidate = officeElection.candidates[0];
                disclosureApi.candidate.get({candidate_id: candidate.id})
                  .then(function(candidate) {
                    expect(candidate).to.have.property('last_name');
                  });
              });
          });
      });
  });


});
