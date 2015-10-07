/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story', {
        url: '/story',
        templateUrl: 'ja/story/story.html',
        resolve: {
            stories: (StoryFactory) => StoryFactory.find()
        },
        controller: 'StoryCtrl'
    })
});

app.controller('StoryCtrl', ($scope, $state) => {
    $scope.stories = stories;


});
