app.directive('conceptItem', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/concept-item/concept-item.html',
    scope: {
      concept: '='
    },
  };
});