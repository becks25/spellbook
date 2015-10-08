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

app.controller('UserCtrl', function ($scope, AuthService, UserFactory, $state, user, StoryFactory) {
  $scope.user = user;
  // $scope.getScore = UserFactory.methods.getScore();
  // console.log('score', $scope.getScore);
  // $scope.goToPage = (pageNum)=>{
  //   StoryFactory.goToPage(pageNum);
  // };
  
  $scope.totalPoints = (function(){
    var total = 0;

    $scope.user.mastery.forEach(concept => total+= concept.pointsEarned);

    return total;
  })();

});
