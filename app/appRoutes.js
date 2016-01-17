'use strict';

function appRoutes($stateProvider) {

  var home = {
    name: 'home', // state name
    url: '/', // url path that activates this state
    template: '<home-page></home-page>', // generate the Directive "homeView" - when calling the directive in HTML, the name must not be camelCased
    ncyBreadcrumb: {
      label: 'Home'
    },
    data: {
      moduleClasses: 'page', // assign a module class to the <body> tag
      pageClasses: 'home', // assign a page-specific class to the <body> tag
      pageTitle: 'Home', // set the title in the <head> section of the index.html file
      pageDescription: 'Meta Description goes here' // meta description in <head>
    }
  };

  var appMain = {
    name: 'appMain',
    abstract: true,  // This makes it so that the url for this route doesn't actually resolve
    url: '/app-main',
    template: '<app-main></app-main>'
  };

  var city = {
    name: 'appMain.city',
    abstract: true,
    url: '^/city/:locality_id',
    controller: require('./components/common/cityModule/cityController'),
    template: require('./components/common/cityModule/index.html'),
    resolve: {
      city: function($stateParams, disclosureApi) {
        return disclosureApi.locations.get({locality_id: $stateParams.locality_id});
      }
    },
    data: {
      moduleClasses: 'page',
      pageClasses: 'city',
      pageTitle: 'City',
      pageDescription: 'Some description.'
    }
  };

  var cityMoney = {
    name: 'appMain.city.money',
    url: '/money',
    template: require('./components/common/cityModule/money/index.html'),
    ncyBreadcrumb: {
      label: '{{ city.location.name }}',
      parent: 'appMain.city'
    },
    data: {
      moduleClasses: 'page',
      pageClasses: 'city',
      pageTitle: 'City',
      pageDescription: 'Some description.'
    }
  };

  var cityElections = {
    name: 'appMain.city.elections',
    url: '/elections',
    template: require('./components/common/cityModule/elections/index.html'),
    controller: 'cityElectionsController',
    ncyBreadcrumb: {
      label: '{{ city.location.name }}',
      parent: 'appMain.city'
    },
    resolve: {
      ballot: function($q) {
        return $q.resolve({
          ballot_id: 'ballot1',
          locality_id: 'locality2',
          contests: [
            {
              contest_type: 'office',
              name: 'Mayor'
            },
            {
              contest_type: 'office',
              name: 'City Auditor'
            },
            {
              contest_type: 'office',
              name: 'City Treasurer'
            },
            {
              contest_type: 'office',
              name: 'Distrit 1 City Council'
            },
            {
              contest_type: 'office',
              name: 'Distrit 3 City Council'
            },
            {
              contest_type: 'office',
              name: 'Distrit 5 City Council'
            },
            {
              contest_type: 'referendum',
              name: 'Measure AA'
            },
            {
              contest_type: 'referendum',
              name: 'Measure BB'
            },
            {
              contest_type: 'referendum',
              name: 'Measure CC'
            }
          ]
        });
      }
    },
    data: {
      moduleClasses: 'page',
      pageClasses: 'city',
      pageTitle: 'City',
      pageDescription: 'Some description.'
    }
  };

  var about = {
    name: 'appMain.about', // state name
    url: '^/about', // The ^ character makes this url override the parent url
    template: '<about-page></about-page>', // generate the Directive "aboutPage"
    ncyBreadcrumb: {
      label: 'About',
      parent: 'appMain'
    },
    data: {
      moduleClasses: 'page', // assign a module class to the <body> tag
      pageClasses: 'aboutPage', // assign a page-specific class to the <body> tag
      pageTitle: 'About', // set the title in the <head> section of the index.html file
      pageDescription: 'Meta Description goes here' // meta description in <head>
    }
  };

  var faq = {
    name: 'appMain.faq', // state name
    url: '^/faq', // The ^ character makes this url override the parent url
    template: '<faq-page></faq-page>', // generate the Directive "faqPage"
    ncyBreadcrumb: {
      label: 'FAQ',
      parent: 'appMain'
    },
    data: {
      moduleClasses: 'page', // assign a module class to the <body> tag
      pageClasses: 'faqPage', // assign a page-specific class to the <body> tag
      pageTitle: 'Frequently Asked Questions', // set the title in the <head> section of the index.html file
      pageDescription: 'Meta Description goes here' // meta description in <head>
    }
  };

  //var cityElections = {
  //  name: 'cityElections',
  //  url: '/city-elections',
  //  template: '<app-main></app-main>',
  //  //controller: 'ExamplePage1Controller',
  //  data: {
  //    moduleClasses: 'page',
  //    pageClasses: 'cityElections',
  //    pageTitle: 'City Elections',
  //    pageDescription: 'Some description.'
  //  }
  //};

  var examplePage1 = {
    name: 'appMain.examplePage1',
    url: '^/example-page-1', // The ^ character makes this url override the parent url
    template: '<example-page-1></example-page-1>',
    //controller: 'ExamplePage1Controller',
    ncyBreadcrumb: {
      label: 'Example Page 1',
      parent: 'appMain'
    },
    data: {
      moduleClasses: 'page',
      pageClasses: 'examplePage1',
      pageTitle: 'Example Page 1',
      pageDescription: 'Some description.'
    }
  };


  $stateProvider.state(home);
  $stateProvider.state(appMain);
  $stateProvider.state(about);
  $stateProvider.state(faq);
  $stateProvider.state(city);
  $stateProvider.state(cityMoney);
  $stateProvider.state(cityElections);
  $stateProvider.state(examplePage1);

}

appRoutes.$inject = ['$stateProvider'];
module.exports = appRoutes;
