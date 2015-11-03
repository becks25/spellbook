app.directive('individualClass', function ( $state) {

    return {
        restrict: 'E',
        templateUrl: 'js/teacher/directives/individualClass.html',
        link: (scope, elem, attr) => {
        	scope.showMore = false;
        	
        }
    };
  });