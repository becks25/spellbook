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
      console.log('here');
      scope.hover = () => {
        console.log('here?');
        scope.show = !scope.show;
      }
    }
  };
});
