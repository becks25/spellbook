app.directive('box', function ($rootScope, $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/gameboard/box.html',
        link: (scope, elem, attr) => {
          //add the action from the gameboard as an attribute onto the box itself
          elem.attr(scope.square, "");
        }
    }
  });