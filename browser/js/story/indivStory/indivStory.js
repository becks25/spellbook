/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('indivStory', {
        url: 'story/:storyId',
        templateUrl: 'js/story/indivStory/indivStory.html',
        controller: 'IndivStoryCtrl'
    });
});

app.controller('IndivStoryCtrl', ($scope, $state) => {
        
});
