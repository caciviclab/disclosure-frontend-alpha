/**
 * measurePageModule/state.js
 *
 * The ui-router state configuration for the ballot measure module. Contains several
 * pages containing information on a single ballot measure.
 **/

'use strict';

module.exports = function($stateProvider) {
  $stateProvider
    .state({
      name: 'appMain.measure',
      url: '^/measure/:measure_id',
      abstract: true,
      controller: 'measurePageController',
      template: '<ui-view></ui-view>',
      resolve: {
        measure: function($stateParams, $q) {
          return $q.resolve({
            measure_id: 1,
            city: {
              fips_id: 6075,
              location: {
                name: 'San Francisco'
              }
            }, // Not sure if city really makes sense here
            number: 'BB',
            full_text: 'Shall the Charter of the City of Oakland be amended to provide the Public Ethics Commission greater independence, broader enforcement authority, powers and…',
            title: 'Ethics Commission Authority Increase Charter Amendment',
            supporting_count: 4,
            opposing_count: 6
          });
        }
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'measure',
        pageTitle: 'Measure',
        pageDescription: 'Ballot measures.'
      }
    })
    .state({
      name: 'appMain.measure.index',
      url: '',
      template: '<measure-listing measure="measure"></measure-listing>',
      ncyBreadcrumb: {
        label: 'Measure {{ measure.number }}',
        parent: 'appMain.city({fips_id: measure.city.fips_id})'
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'measure',
        pageTitle: 'Measure',
        pageDescription: 'Ballot measures.'
      }
    })
    .state({
      name: 'appMain.measure.supporting',
      url: '/supporting',
      controller: 'measureCommitteeSupportingPageController',
      template: '<measure-committee-supporting measure="measure" supporters="supporters"></measure-committee-supporting>',
      ncyBreadcrumb: {
        label: 'Supporting',
        parent: 'appMain.measure.index'
      },
      resolve: {
        supporters: function($stateParams, $q) {
          return $q.resolve([
            {name: 'Citizens for a Better Oakland', contributions: 185859},
            {name: 'Oaklanders for Ethical Government', contributions: 152330},
            {name: 'Americans for Liberty', contributions: 83199},
            {name: 'Golden State Citizens for Positive Reform', contributions: 23988}
          ]);
        }
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'measure-supporting',
        pageTitle: 'Supporters',
        pageDescription: 'Supporters of the ballot measure.'
      }
    })
    .state({
      name: 'appMain.measure.opposing',
      url: '/opposing',
      controller: 'measureCommitteeOpposingPageController',
      template: '<measure-committee-opposing measure="measure" opposers="opposers"></measure-committee-opposing>',
      ncyBreadcrumb: {
        label: 'Opposing',
        parent: 'appMain.measure.index'
      },
      resolve: {
        opposers: function($stateParams, $q) {
          return $q.resolve([
            {name: 'Citizens for a Better Oakland', contributions: 185859},
            {name: 'Oaklanders for Ethical Government', contributions: 152330},
            {name: 'Americans for Liberty', contributions: 83199},
            {name: 'Golden State Citizens for Positive Reform', contributions: 23988},
            {name: 'The Public Commission for Ethical Civic Reform', contributions: 15040},
            {name: 'The Committee of True Americans who Dearly Love America and Liberty', contributions: 7943}
          ]);
        }
      },
      data: {
        moduleClasses: 'page',
        pageClasses: 'measure-opposing',
        pageTitle: 'Opposers',
        pageDescription: 'Opposers of the ballot measure.'
      }
    });
};
