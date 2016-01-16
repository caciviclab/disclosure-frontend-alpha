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
    controller: 'committeeController',
    resolve: {
      committee: function($stateParams, $q) {
        return $q.resolve({
          committee_id: 1234,
          name: 'Americans for Liberty',
          contribution_by_type: {
            unitemized: 2916394,
            self_funded: 512554,
            political_party: 6426112,
            individual: 11134547,
            recipient_committee: 986229
          },
          contribution_by_area: {
            inside_location: 0.56,
            inside_state: 0.38,
            outside_state: 0.06
          }
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
    template: require('./templates/committee.html'),
    ncyBreadcrumb: {
      label: '{{ committee.name }}',
      parent: 'appMain.city'
    }
  });

  $stateProvider.state({
    name: 'appMain.committee.contributors',
    url: '/contributors',
    controller: 'contributorsController',
    template: require('./templates/contributors.html'),
    ncyBreadcrumb: {
      label: 'Contributors',
      parent: 'appMain.committee.main'
    },
    resolve: {
      contributors: function($stateParams, $q) {
        return $q.resolve([
          {
            name: 'Samantha Brooks',
            amount: 700,
            date: new Date('2015-04-12')
          },
          {
            name: 'Lisa Sheppards',
            amount: 700,
            date: new Date('2015-01-13')
          },
          {
            name: 'Raoul Esponsito',
            amount: 700,
            date: new Date('2015-04-04')
          }
        ]);
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
