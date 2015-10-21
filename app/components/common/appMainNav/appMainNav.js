(function() {
  'use strict';

  //var appMainNavModule = require('./appMainNav');
  var appMainNavDirective = require('./appMainNavDirective');
  var AppMainNavController = require('./AppMainNavController');

  module.exports = angular.module('appMainNavModule', ['ui.bootstrap.collapse'])
    .directive('appMainNav', appMainNavDirective)
    .controller('AppMainNavController', AppMainNavController);

})();
