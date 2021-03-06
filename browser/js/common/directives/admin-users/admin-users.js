app.directive('adminUsers', ['UserFactory', function(UserFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/admin-users/admin-users.html',
    scope:{
      user: "=",
      percent: "="
    },
    link: (scope, elem) =>{
      scope.more=false;

      scope.toggleView = () => scope.more = !scope.more;

      scope.findPercentage = scope.percent;

      scope.changeAdmin = () => {
        UserFactory.update(scope.user._id, scope.user);
      }
    }
  };
}]);