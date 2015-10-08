app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/me',
        templateUrl: 'js/user/user.html',
        resolve: {
          user: (UserFactory, AuthService) => {
            return AuthService.getLoggedInUser()
            .then(user => {
                return UserFactory.find(user._id);

            })
          }
          // completedStories: (user, StoryFactory)
        },
        controller: 'UserCtrl'
    });
});

app.controller('UserCtrl', function ($scope, AuthService, UserFactory, $state, user) {
  $scope.user = user;
  console.log(user)
  $scope.getScore = UserFactory.getScore;
  console.log('user', user)

});
