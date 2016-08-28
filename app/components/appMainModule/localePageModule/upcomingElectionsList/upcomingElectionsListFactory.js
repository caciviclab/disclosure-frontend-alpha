'use strict';

function upcomingElectionsListFactory($http, $q, $log, CONSTANTS, disclosureApi) {
  var apiBaseUrl = CONSTANTS.DISCLOSURE_API_BASEURL;

  var service = {
    // getListOfOffices: getListOfOffices
    // getListOfOfficeElections: getListOfOfficeElections,
    getUpcomingElectionData: getUpcomingElectionData
  };
  return service;

  function getUpcomingElectionData(localeId) {
    return disclosureApi.locality.current_ballot({locality_id: localeId});
  }

  function getUpcomingElectionDataComplete(data) {
    return data.data;
  }

  function getUpcomingElectionDataFailed() {
    $log.error('get ballot data failed');
  }
}

upcomingElectionsListFactory.$inject = ['$http', '$q', '$log', 'CONSTANTS', 'disclosureApi'];
module.exports = upcomingElectionsListFactory;
