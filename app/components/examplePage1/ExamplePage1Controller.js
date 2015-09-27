(function() {
  'use strict';
  // Controller naming conventions should start with an uppercase letter
  function ExamplePage1Controller($scope, $http) {
    // Sum the non-itemized data over the summary pages, its in the row labled A,2.
    var notItemized;
    $http.get('https://data.oaklandnet.com/resource/rsxe-vvuw.json?$select=sum(amount_a)&$where=elect_date=\'2012-11-06T00:00:00\' and form_type=\'A\' and line_item=\'2\'').
      success(function(sum) {
        notItemized = sum[0].sum_amount_a;
      });
    // Sum by the entity code from schedule A
    $http.get('https://data.oaklandnet.com/resource/3xq4-ermg.json?$select=sum(tran_amt1), entity_cd&$group=entity_cd&$where=elect_date=\'2012-11-06T00:00:00\'')
      .success(function(data) {
          // Calculate the grand total.
          data = data.concat({ entity_cd: 'NIT', sum_tran_amt1: notItemized });
          data = data.map(function(item) {
              item.sum_tran_amt1 = item.sum_tran_amt1;
                return item;
          });
          $scope.total = 0;
          for (var i = 0; i < data.length; i++) {
            $scope.total += data[i].sum_tran_amt1;
          }
          data.sort(function(a, b) {
            return b.sum_tran_amt1 - a.sum_tran_amt1;
          });
          $scope.data = data;

        });
  }

  // $inject is necessary for minification. See http://bit.ly/1lNICde for explanation.
  ExamplePage1Controller.$inject = ['$scope'];
  module.exports = ExamplePage1Controller;
})();
