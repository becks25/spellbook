/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('indivStory', {
        url: 'story/:storyId',
        templateUrl: 'js/story/indivStory/indivStory.html',
        resolve: {
            pages: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.id)
                .then(result => result.pages)
        },
        controller: 'IndivStoryCtrl'

    });
});

app.controller('IndivStoryCtrl', ($scope, $state) => {

    $scope.pages = pages;


});
