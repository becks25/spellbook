/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story', {
        url: '/story',
        views: {
            'main': {
                controller: 'StoryCtrl',
                templateUrl: 'js/story/story.html'
            }
        },
        resolve: {
            stories: (StoryFactory) => StoryFactory.findAll(),
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        if(user) return UserFactory.find(user._id);
                        else return;
                    })
            }
        },
        controller: 'StoryCtrl'
    })
});

app.controller('StoryCtrl', ($scope, $state, stories, $timeout, StoryFactory, $stateParams, $rootScope, outTran, user) => {
    $scope.stories = stories;
    $scope.pop = false;

    var findIfStarted = (story) => {
        return story.getAllPages(story._id)
            .then(pages => {
                for(var i =0; i < user.unfinishedPages.length; i++) {
                    if(user.unfinishedPages[i].storyId === story._id) {
                        return user.unfinishedPages[i];
                    }
                }
                for(var j =0; j < pages.length; j++) {
                    if(pages[j].pageNumber === 0) return pages[j];
                }
            });
    };

    $scope.goToStoryPage = (event, story) => {
        findIfStarted(story).then(result => {
            Promise.all(outTran.animate(event.currentTarget))
                .then(() => $state.go('page', {id: result._id}))
        });
    };
});
