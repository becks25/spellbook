app.directive('spell', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/spell/spell.html',
        link: (scope, elem, attr) => {
          //on drop, element should be added to spellTools model
        }
    }
  });