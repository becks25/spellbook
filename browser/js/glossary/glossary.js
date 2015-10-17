app.config($stateProvider => {
  $stateProvider.state('glossary',{
      url: '/glossary',
      views: {
          main: {
              templateUrl: 'js/glossary/glossary.html',
                  controller: 'glossaryCtrl'

          }
      }
  });
});

app.controller('glossaryCtrl', ($scope, AuthService, $state, $stateParams) => {
  
});
