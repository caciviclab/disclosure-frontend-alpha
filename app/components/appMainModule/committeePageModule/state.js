/**
 * committeeModule/state.js
 *
 * The ui-router state configuration for the committee module. Contains several
 * pages containing information on a single campaign committee.
 **/

'use strict';

module.exports = function($stateProvider) {
  $stateProvider.state({
    name: 'appMain.committee',
    abstract: true,
    url: '^/committee/:committee_id',
    template: '<ui-view></ui-view>',
    controller: 'committeePageController',
    resolve: {
      committee: function($stateParams, disclosureApi) {
        return disclosureApi.committee.get({
          committee_id: $stateProvider.committee_id
        });
      }
    },
    data: {
      moduleClasses: 'page',
      pageClasses: 'committee',
      pageTitle: 'Committee',
      pageDescription: 'A campaign committee.'
    }
  });

  $stateProvider.state({
    name: 'appMain.committee.main',
    url: '',
    template: '<committee-listing committee="committee"></committee-listing>',
    ncyBreadcrumb: {
      label: '{{ committee.name }}',
      parent: 'appMain.locality'
    }
  });

  $stateProvider.state({
    name: 'appMain.committee.contributors',
    url: '/contributors',
    controller: 'committeeContributorsPageController',
    template: '<committee-contributors contributors="contributors"></committee-contributors>',
    ncyBreadcrumb: {
      label: 'Contributors',
      parent: 'appMain.committee.main'
    },
    resolve: {
      contributors: function($stateParams, disclosureApi) {
        return disclosureApi.committee.contributors({
          committee_id: $stateProvider.committee_id
        });
      }
    },
    data: {
      moduleClasses: 'page',
      pageClasses: 'contributors',
      pageTitle: 'Committee contributors',
      pageDescription: 'Contributors to a campaign committee.'
    }
  });
};
