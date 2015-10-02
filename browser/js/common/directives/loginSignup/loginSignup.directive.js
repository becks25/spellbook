app.directive('signup', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/loginSignup/signup.html'
    // link: function(scope) {

    //   scope.validateForm = function() {
    //     var x = document.forms['signupForm', 'email'].value;
    //     console.log(x);
    //   }
    // }
  };
});


app.directive('login', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/loginSignup/login.html',
  };
});