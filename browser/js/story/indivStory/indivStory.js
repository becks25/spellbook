/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story.indivStory', {
        url: '/:storyId',
        views: {
            'content': {
                resolve: {
                    story: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.storyId)
                },
                templateUrl: 'js/story/indivStory/indivStory.html',
                controller: 'indivStoryCtrl'
            }
        }

    });
});

app.controller('indivStoryCtrl', ($scope, $state, $stateParams, StoryFactory, story, $timeout) => {
    story.getAllPages($stateParams.storyId)
        .then(pages => {
            console.log(pages);
            $scope.pages = pages;
        });
    $scope.cover = story.cover;

    $timeout(() => {
        $("#flipbook").turn({
            width: 400,
            height: 300,
            autoCenter: true
        });
    }, 0);


});
