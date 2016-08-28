'use strict';

var _ = require('lodash');
var Swagger = require('swagger-client');

function DisclosureService($q, $rootScope, url) {
  this.$rootScope = $rootScope;
  this.$q = $q;

  var defer = $q.defer();
  this.ready = defer.promise;
  this.swagger = new Swagger({
    url: url,
    success: function() {
      $rootScope.$apply(function() {
        defer.resolve();
      });
    },
    failure: function(err) {
      var error = new Error('Failed to fetch swagger spec: ' + (err.stack || err.toString()));
      console.error(error);
      $rootScope.$apply(function() {
        defer.reject(error);
      });
    }
  });

  this.initialize();
}

DisclosureService.prototype = {
  initialize: function() {
    var self = this;
    function setupProxy(namespace, method) {
      self[namespace] = self[namespace] || {};
      self[namespace][method] = function(params, options) {
        return self._proxy.call(self, namespace, method, params, options);
      };
    }

    //////////////////////////////
    // Non-disclosure info
    //////////////////////////////

    // Ballot
    setupProxy('ballot', 'get');  // List of ballot items.
    setupProxy('candidate', 'get');  // Candidate details
    setupProxy('elections', 'list');  // List all elections
    setupProxy('office_election', 'get');  // List of candidates
    setupProxy('referendum', 'get');  // Referendum details

    // Locality
    setupProxy('locality', 'get');  // Locality details (e.g. name)


    // Non-disclosure information, filtered by presence of disclosure data
    setupProxy('locality', 'current_ballot');  // Show current ballot
    setupProxy('locality', 'search');

    //////////////////////////////
    // Disclosure info
    //////////////////////////////

    // Basic info
    setupProxy('committee', 'get');  // Committee details

    // Money info
    setupProxy('ballot', 'disclosure_summary');  // overall disclosure summary
    setupProxy('candidate', 'supporting');
    setupProxy('candidate', 'opposing');
    setupProxy('committee', 'contributors');  // list of contributors
    setupProxy('committee', 'contributions');  // list of contributions made to other campaigns
    setupProxy('committee', 'summary');  // summary over contributors
    setupProxy('referendum', 'supporting');
    setupProxy('referendum', 'opposing');

  },

  // Proxies the swagger function in an angular promise
  _proxy: function(namespace, method, params, options) {
    // Set defaults
    params = params || {};
    options = _.defaults(options || {}, {responseContentType: 'application/json'});

    var swagger = this.swagger;
    var $q = this.$q;
    var $rootScope = this.$rootScope;

    // Swagger builds async, unfortunately
    return this.ready.then(function() {
      return $q(function(resolve, reject) {
        try {
          swagger[namespace][method].call(swagger, params, options,
            function(resp) {
              $rootScope.$apply(function() {
                resolve(resp.obj);
              });
            },
            function(err) {
              $rootScope.$apply(function() {
                reject(err);
              });
            });
        } catch (err) {
          reject(err);
        }
      });
    });
  }
};

module.exports = DisclosureService;
