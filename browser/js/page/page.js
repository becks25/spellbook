app.config($stateProvider => {
    $stateProvider.state('page', {
        url: '/page/:id',
        resolve: {
            page: (PageFactory, $stateParams) => PageFactory.find($stateParams.id),
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                .then(user => {
                    console.log('got here')
                    if(user) return UserFactory.find(user._id);
                    console.log('no user found');
                    return;

                });
              },
            story: (page, StoryFactory) => {
                return StoryFactory.find(page.storyId);
            },
            storyPages: (story, user) => {
                return story.getAllPages(story._id)
                    .then(pages => pages)
                    .then(pages => {

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
