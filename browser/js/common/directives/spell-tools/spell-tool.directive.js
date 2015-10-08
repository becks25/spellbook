app.directive('spellTool', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/spell-tools/spell-tool.html',
        link: (scope, elem, attr) => {
          //on drop, element should be added to spellTools model
           //info about the tool



        }
    }
  });