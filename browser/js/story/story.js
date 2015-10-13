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
                        return UserFactory.find(user._id);
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
        console.log('hi');
        for (var i = 0; i < user.unfinishedPages; i++) {
            if (user.unfinishedPages[i].storyId === story._id) return user.unfinishedPages[i];
            else {
                return story.getAllPages(story._id)
                    .then(pages => console.log(pages));
            }
        }
    };


    $scope.goToStoryPage = (event, story) => {
        findIfStarted(story);
        //Promise.all(outTran.animate(event.currentTarget)).then(() => {
        //    story.goToStory(story._id);
        //});
    };

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        if (from.name === 'story.indivStory' && to.name === 'story') {
            console.log('from', from, 'to', to);
        }
    });
});
