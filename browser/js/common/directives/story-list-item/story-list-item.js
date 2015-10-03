app.directive('storyListItem', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/story-list-item/story-list-item.html',
    scope: {
      story: '='
    },
  };
});