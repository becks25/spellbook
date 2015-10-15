app.config($stateProvider => {
	$stateProvider.state('addStory',{
		url: '/addStory',
        resolve: {
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                .then(user => {
                    console.log(user);
                    return UserFactory.find(user._id);

                })
              }
        },
        views: {
            main: {
                templateUrl: 'js/add-story/add-story.html',
                controller: 'AddStoryController'

            }
        }
	});
});


app.controller('AddStoryController', function ($scope, user, StoryFactory, $state) {
   
    $scope.user = user;

    console.log("we are here")

    $scope.createStory = () => {
        var storyToCreate = {};
        storyToCreate.title = $scope.title;
        storyToCreate.description = $scope.description;
        storyToCreate.difficulty = $scope.difficulty;
        storyToCreate.concepts = $scope.concepts;
        storyToCreate.cover = $scope.cover;

        StoryFactory.create(storyToCreate)
        .then(function(story){
            console.log('going', story, story._id)
            $state.go('add', {storyId: story._id})
        });

    };





    //$scope.user = _.uniq($scope.stories, 'author');

    //$scope.mostPopular = _.max($scope.storyPopularity, (story) => story[1]);

   


});