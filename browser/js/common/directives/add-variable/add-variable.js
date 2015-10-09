app.directive('addVariable', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/add-variable/add-variable.html',
        scope: {
        	tool: '='
        },
        link: (scope, elem, attr) => {
        }
    }
  });