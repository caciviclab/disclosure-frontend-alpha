'use strict';

function cityElectionsController($scope, ballot) {
  function isOffice(contest) {
    return contest.contest_type === 'office';
  }

  function isReferendum(contest) {
    return contest.contest_type === 'referendum';
  }

  $scope.ballot = ballot;
  $scope.isOffice = isOffice;
  $scope.isReferendum = isReferendum;
}

module.exports = cityElectionsController;
