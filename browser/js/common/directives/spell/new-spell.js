app.directive('newSpell', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/spell/new-spell.html',
        link: (scope, elem, attr) => {
          //on drop, element should be added to spellTools model
        }
    }
  });