/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story.indivStory', {
        url: '/:storyId',
        views: {
            'content': {
                templateUrl: 'js/story/indivStory/indivStory.html'
            },
            params: {
                story: null
            },
            resolve: {
                story: (StoryFactory) => StoryFactory.find(story)
            }
        },
        controller: 'indivStoryCtrl'

    });
});

app.controller('indivStoryCtrl', ($scope, $state, $stateParams, story) => {
    $scope.story = story;
    console.log('hi');
    $scope.func = () => console.log('hi');
    //$scope.hide = true;
//    templateUrl: 'js/story/indivStory/indivStory.html'}

});
