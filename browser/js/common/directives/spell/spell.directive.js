app.directive('spell', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/spell/spell.html',
        link: (scope, elem, attr) => {
          scope.spellTools = [
            'test',
            'testing'
          ];
        }
    }
  });