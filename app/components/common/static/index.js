'use strict';


var angular = require('angular');

angular.module('odca.static_api', [
    require('angular-resource')
  ])
  .factory('static_api', function ($resource, settings) {
    'ngInject';

    return {
      candidate: api_group('/candidate/:candidate_id', {
        // all data is in one file
        supporting: {
          method: 'get',
          url: '/'
        },
        opposing: {
          method: 'get',
          url: '/'
        }
      }),
      committee: api_group('/committee/:filer_id', {
        contributions: {
          method: 'get',
          url: '/contributions',
          isArray: true
        }
      }),
      locality: api_group('/locality/:locality_id', {
        get: {
          method: 'get',
          transformResponse: arrayFirst
        }, // Workaround for backend returning an  array here
        current_ballot: {
          method: 'get',
          url: '/current_ballot'
        }
      }),
      referendum: api_group('/referendum/:referendum_id', {
        supporting: {
          method: 'get',
          url: '/supporting'
        },
        opposing: {
          method: 'get',
          url: '/opposing'
        }
      }),
      stats: api_group('/stats', {})
    };

    function api_group(base_url, actions, defaultParams) {
      var absolute_url = settings.DISCLOSURE_STATIC_BACKEND + base_url;
      defaultParams = defaultParams || {};

      var resourceActions = {};
      Object.keys(actions).forEach(function (actionName) {
        var action = actions[actionName];
        resourceActions[actionName] = angular.extend({
          cache: true
        }, action, {
          url: absolute_url + (action.url || '')
        });
      });

      return $resource(absolute_url, defaultParams, resourceActions);
    }

    function arrayFirst(data) {
      return angular.fromJson(data)[0];
    }
  });

module.exports = 'odca.static_api';
