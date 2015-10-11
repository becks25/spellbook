app.directive('actionTools', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tools/action-tools.html',
        scope:{
          actiontool: "=",
          model:"=",
          index: "=",
          parent: "=",
          remove: "="
        }
    }
  });