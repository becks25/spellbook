app.config(function ($stateProvider) {

    $stateProvider.state('loginSignup', {
        url: '/login',
        templateUrl: 'js/loginSignup/loginSignup.html',
        controller: 'LoginSignupCtrl'
    });

});


app.controller('LoginSignupCtrl', function ($rootScope, AUTH_EVENTS, $scope, AuthService, $state, UserFactory) {

    $scope.login = {};
    $scope.loginError = null;
    $scope.signupError = null;

    $scope.validateForm = function() {
    var x = document.forms['signupForm', 'email'].value;
    // console.log(x);
  }

    $scope.sendLogin = function (loginInfo) {

        $scope.loginError = null;

        AuthService.login(loginInfo)
        .then(function () {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };



  $scope.createUser = function(userInfo) {
    $scope.signupError = null;
    UserFactory.create(userInfo)
    .then(function() {
        $state.go('home');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      }).catch(function() {
        $scope.signupError = 'User already exists';
      });
  };

});


