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
        measure: function($stateParams, disclosureApi) {
          return disclosureApi.referendum.get({
            referendum_id: $stateParams.measure_id
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
        parent: 'appMain.locality({locality_id: measure.city.fips_id})'
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
        supporters: function($stateParams, disclosureApi) {
          return disclosureApi.referendum.supporting({
            referendum_id: $stateParams.measure_id
          });
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
        opposers: function($stateParams, disclosureApi) {
          return disclosureApi.referendum.opposing({
            referendum_id: $stateParams.measure_id
          });
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
