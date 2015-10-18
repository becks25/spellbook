app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        views: {
            main: {
                templateUrl: 'js/home/home.html',
                controller: 'homeCtrl'

            }
        },
    });
});

app.controller('homeCtrl', ($scope, $state) => {
  $scope.goBooks = () => {
    $('#book').fadeOut(500, ()=>{
      $state.go('story');
    });
  }
});