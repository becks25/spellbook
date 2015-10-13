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
            stories: (StoryFactory) => StoryFactory.findAll()
        },
        controller: 'StoryCtrl'
    })
});

app.controller('StoryCtrl', ($scope, $state, stories, $timeout, StoryFactory, $stateParams, $rootScope) => {
    $scope.stories = stories;
    $scope.pop = false;

    $scope.goToStoryPage = (event, story) => {
        story.goToStory(story._id);
    };

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
        if(from.name === 'story.indivStory' && to.name === 'story') {
            console.log('from',from,'to', to);
        }
    });
});
