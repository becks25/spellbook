app.config(function ($stateProvider) {
    $stateProvider.state('page', {
        url: '/page/:id',
        templateUrl: 'js/page/page.html',
        resolve: {
          page: (PageFactory, $stateParams) => PageFactory.find($stateParams.id);
        },
        controller: 'PageCtrl'
    });
});

app.controller('PageCtrl', function ($scope, AuthService, $state, page) {
  $scope.page = page;

});
