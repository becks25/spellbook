/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('indivStory', {
        url: 'story/:storyId',
        views: {
            'content': { templateUrl: 'js/story/indivStory/indivStory.html'}
        },
        //resolve: {
        //    story: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.id)
        //},
        controller: 'IndivStoryCtrl'

    });
});

app.controller('IndivStoryCtrl', ($scope, $state) => {
    //$scope.story = story;

});
