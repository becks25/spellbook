app.directive('gameBoard', function ($rootScope, $state) {

    return {
        restrict: 'E',
        scope: {
          gameboard:"=",
          requirements: "="
        },
        templateUrl: 'js/common/directives/gameboard/gameboard.html',
        link: (scope, elem, attr) => {
         
        }
    }
  });