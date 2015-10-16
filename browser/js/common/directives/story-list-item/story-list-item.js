app.directive('storyListItem', () => {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/story-list-item/story-list-item.html',
    scope: {
      story: '=',
      index: '='
    },
    link: (scope) => {
      scope.show = false;
      scope.hover = () => {
        scope.show = !scope.show;
      }
    }
  };
});
