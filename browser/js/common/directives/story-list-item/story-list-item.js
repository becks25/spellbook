app.directive('storyListItem', () => {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/story-list-item/story-list-item.html',
    scope: {
      story: '=',
      index: '=',
      shelf: '='
    },
    link: (scope, elem) => {
      scope.show = false;
      scope.hover = () => {
        scope.show = !scope.show;
      }

    }
  };
});
