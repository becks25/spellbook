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

app.controller('StoryCtrl', ($scope, $state, stories, $timeout, StoryFactory) => {
    $scope.stories = stories;
    $scope.pop = false;

    $scope.goToStoryPage = story => {
        console.log(story._id);
        story.goToStory(story._id);
    }
});
