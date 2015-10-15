app.directive('nextToolBox', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/tool-box/next-tool-box.html',
        scope:{
          tools: '=',
          directions: '=',
          vars: '='
        },
        link: (scope, elem, attr) => {
            scope.re = /_/g;

        }
    }
  });
