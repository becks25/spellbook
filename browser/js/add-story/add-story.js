app.config($stateProvider => {
	$stateProvider.state('addStory',{
		url: '/addStory',
        resolve: {
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                    .then(user => UserFactory.find(user._id))
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


app.controller('AddStoryController', function ($scope, user, StoryFactory, $state, SpellComponentFactory) {

    $scope.user = user;

    $scope.allConcepts = SpellComponentFactory.possConcepts

    function getConcepts() {
        var arr = [];
        for (var i = 0; i < $scope.allConcepts.length; i++){
            arr.push({name: $scope.allConcepts[i], checked: false})
        }
        return arr;
    }

    $scope.possibleConcepts = getConcepts();



    $scope.theConcepts = [];

    $scope.selectedConcepts = (con) => {
        $scope.theConcepts.push(con.name);
    };


    $scope.logConcepts = () => {
        console.log("logging", $scope.theConcepts);
    };


    $scope.createStory = () => {
        var storyToCreate = {};
        storyToCreate.title = $scope.title;
        storyToCreate.description = $scope.description;
        storyToCreate.difficulty = $scope.difficulty;
        storyToCreate.concepts = $scope.theConcepts;
        storyToCreate.cover = $scope.cover || "https://cdn.vectorstock.com/i/composite/90,62/card-with-cartoon-castle-vector-1099062.jpg";

        StoryFactory.create(storyToCreate)
        .then(function(story){
            $state.go('add', {storyId: story._id})
        });

    };

});





