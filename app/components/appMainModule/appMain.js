'use strict';

/* exported examplePage1Module, aboutPageModule */
/* exported faqPageModule, measurePageModule */
var examplePage1Module = require('./examplePage1Module/examplePage1');
var aboutPageModule = require('./aboutPageModule/aboutPage');
var faqPageModule = require('./faqPageModule/faqPage');
var measurePageModule = require('./measurePageModule');

var appMainDirective = require('./appMainDirective');
var AppMainController = require('./AppMainController');

module.exports = angular.module('appMainModule',
  [
    'pageHeaderBreadcrumbsModule',
    'examplePage1Module',
    'aboutPageModule',
    'faqPageModule',
    'measurePageModule'
  ])
  .directive('appMain', appMainDirective)
  .controller('AppMainController', AppMainController);
