app.config(function ($stateProvider) {

    $stateProvider.state('loginSignup', {
        url: '/login',
        views: {
            'main': {
                controller: 'LoginSignupCtrl',
                templateUrl: 'js/loginSignup/loginSignup.html'
            }
        }
    });

});


app.controller('LoginSignupCtrl', function ($rootScope, AUTH_EVENTS, $scope, AuthService, $state, UserFactory) {
    $scope.login = {};
    $scope.signup = {};
    $scope.loginError = null;
    $scope.signupError = null;
    $scope.user;

  //   $scope.validateForm = function() {
  //   var x = document.forms['signupForm', 'email'].value;
  //   // console.log(x);
  // }

    $scope.sendLogin = function (loginInfo) {

        $scope.loginError = null;

        AuthService.login(loginInfo)
        .then(function (user) {
            $scope.user = user;
            $state.go('user', {id: $scope.user._id});
        }).catch(function () {
            console.log('erroring out here');
            $scope.loginError = 'Invalid login credentials.';
        });

    };



  $scope.createUser = function(userInfo) {
    $scope.signupError = null;
    UserFactory.create(userInfo)
    .then(function(createdUser) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.user = createdUser;
        $state.go('user', {id: $scope.user._id});
      }).catch(function() {
        $scope.signupError = 'User already exists';
      });
  };

});


