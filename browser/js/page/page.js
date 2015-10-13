app.config($stateProvider => {
    $stateProvider.state('page', {
        url: '/page/:id',
        resolve: {
            page: (PageFactory, $stateParams) => PageFactory.find($stateParams.id),
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                .then(user => {
                    if(user) return UserFactory.find(user._id);
                    else return;

                })
              },
            allPages: (PageFactory) => PageFactory.findAll()
        },
        views: {
            main: {
                templateUrl: 'js/page/page.html',
                    controller: 'PageCtrl'

            }
        }
    });
});
