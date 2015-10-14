app.directive('toolBox', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tool-box/tool-box.html',
        link: (scope, elem, attr) => {
            scope.re = /_/g;

        }
    }
  });
