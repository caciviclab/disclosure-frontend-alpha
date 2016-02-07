/**
 * localityPageModule/state.js
 *
 * The ui-router state configuration for the locality page module.
 **/

'use strict';

module.exports = function($stateProvider) {
  $stateProvider
    .state({
      name: 'appMain.locality',
      abstract: true,
      url: '^/locality/:locality_id',
      controller: 'localityPageController',
      template: '<locality-listing locality="locality"></locality-listing>',
      resolve: {
        locality: function($stateParams, disclosureApi) {
          return disclosureApi.locality.current_ballot({
            locality_id: $stateParams.locality_id
          }).then(function(ballot) {
            disclosureApi.ballot.summary({ballot_id: ballot.ballot_id});
          });
        }
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'locality',
        pageTitle: 'City',
        pageDescription: 'Some description.'
      }
    })

    .state({
      name: 'appMain.locality.money',
      url: '/money',
      template: '<locality-money locality="locality"></locality-money>',
      ncyBreadcrumb: {
        label: '{{ locality.location.name }}',
        parent: 'appMain.locality'
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'locality',
        pageTitle: 'City',
        pageDescription: 'Some description.'
      }
    })

    .state({
      name: 'appMain.locality.elections',
      url: '/elections',
      template: '<locality-ballot ballot="ballot"></locality-ballot>',
      controller: 'localityBallotPageController',
      ncyBreadcrumb: {
        label: '{{ locality.location.name }}',
        parent: 'appMain.locality'
      },
      resolve: {
        ballot: function($stateParams, disclosureApi) {
          return disclosureApi.locality.current_ballot({
            locality_id: $stateParams.locality_id
          });
        }
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'locality',
        pageTitle: 'City',
        pageDescription: 'Some description.'
      }
    });

};
