app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/user/:id',
        templateUrl: 'js/user/user.html',
        resolve: {
          user: (UserFactory, $stateParams) => UserFactory.find($stateParams.id)
        },
        controller: 'UserCtrl'
    });
});

app.controller('UserCtrl', function ($scope, AuthService, UserFactory, $state, user) {
  $scope.user = user;
  $scope.getScore = UserFactory.getScore;

});
