app.directive('adminStories', ['UserFactory', function(UserFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/admin-stories/admin-stories.html'
  };
}]);