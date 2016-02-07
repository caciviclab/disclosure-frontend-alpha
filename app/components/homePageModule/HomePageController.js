'use strict';

// Controller naming conventions should start with an uppercase letter
function HomePageController($scope, $http, disclosureApi) {
  $scope.searchBarEnabled = false;
  $scope.testVar = 'We are up and running using a required module!';
  $scope.searchResults = [];
  // This is pretty jank, we should debounce this or do the search when the
  // user stops typing.
  $scope.$watch('search', function(newValue) {
    if (typeof newValue === 'undefined') {
      return;
    }

    disclosureApi.locality.search({q: $scope.search})
      .then(function(results) {
        $scope.searchResults = results;
      });
  });
}

// $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
HomePageController.$inject = ['$scope', '$http', 'disclosureApi'];
module.exports = HomePageController;
