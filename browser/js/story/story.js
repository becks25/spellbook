/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story', {
        url: '/story',
        templateUrl: 'js/story/story.html',
        resolve: {
            stories: (StoryFactory) => StoryFactory.findAll()
        },
        controller: 'StoryCtrl'
    })
});

app.controller('StoryCtrl', ($scope, $state, stories, $timeout) => {
    $scope.stories = stories;
    $scope.pop = false;

    $scope.goToStoryPage = storyId => $state.go(`/story/${storyId}`);


});
