'use strict';

angular.module('odca.error', [])
  .run(['$window', 'error', function ($window, error) {
    $window.onerror = onError;

    function onError (message, url, lineNo, columnNo, err) {
      error(err, message, true);
    }
  }])
  .directive('odcaErrorMessage', function () {
    return {
      restrict: 'E',
      controller: ErrorMessageController,
      controllerAs: '$ctrl',
      bindToController: true,
      template: require('./error_message.html')
    };
  })
  .decorator('$exceptionHandler', ['error', function (error) {
    return exceptionHandler;

    function exceptionHandler (err, cause) {
      error(err, cause);
    }
  }])
  .factory('error', ['$injector', '$log', function ($injector, $log) {
    return error;

    function error (err, cause, fatal) {
      var $rootScope = $injector.get('$rootScope'); // avoids a circular dependency with the $exceptionHandler
      var $location = $injector.get('$location'); // avoids a circular dependency with the $rootScope
      var messages = [err];
      if (cause) {
        messages.unshift(cause);
      }

      $log.error.apply(null, messages);
      $rootScope.$emit('odca.error-message', cause);

      if ($location.host().indexOf('localhost') === -1) {
        ga('send', 'exception', {
          exDescription: cause || err.message || err,
          exFatal: !!fatal,
        });
      }
    }
  }]);


function ErrorMessageController ($rootScope, $state) {
  var ctrl = this;
  ctrl.close = close;
  ctrl.home = home;
  ctrl.refresh = refresh;

  $rootScope.$on('odca.error-message', function (e, message) {
    ctrl.message = message; // optional message
    ctrl.isError = true;
  });

  function close () {
    ctrl.message = null;
    ctrl.isError = false;
  }

  function home () {
    close();

    $state.go('home', {reload: true});
  }

  function refresh () {
    close();

    // Don't want to take chances on $location, just reload as best we can
    window.location.reload();
  }
}

ErrorMessageController.$inject = ['$rootScope', '$state'];


module.exports = 'odca.error';
