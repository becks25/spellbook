/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story.indivStory', {
        url: '/:storyId',
        views: {
            'content': {
                resolve: {
                    story: (StoryFactory, $stateParams) => StoryFactory.find($stateParams.storyId),
                    user: (UserFactory, AuthService) => {
                        return AuthService.getLoggedInUser()
                            .then(user => {
                                return UserFactory.find(user._id);
                            })
                    }
                },
                templateUrl: 'js/story/indivStory/indivStory.html',
                controller: 'indivStoryCtrl'
            }
        }

    });
});

app.controller('indivStoryCtrl', ($scope, $state, $stateParams, StoryFactory, story, $timeout, user) => {
    var intersectingPages = (array1, array2) => {
        var output = {};
        for(var i =0; i < array1.length; i++) {
            for(var j = 0; j < array2.length; j++) {
                if(array1[i]._id === array2[j]._id)
                    output = array1[i];
            }
        }
        return output;
    };
    story.getAllPages($stateParams.storyId)
        .then(pages => {
            $scope.pages = pages;
            return pages;
        })
        .then(pages => {
           var current = intersectingPages(pages, user.unfinishedPages);
            if(Object.keys(current).length > 0) {
                $scope.currentPage = current;
            } else {
                pages.some(p => {
                    if(p.pageNumber = 1) {
                        $scope.currentPage = p;
                        return true;
                    }
                })
            }
        });


    $scope.goToStoryPage = story => {
        story.goToStory(story._id);
    };


    $scope.cover = story.cover;

    $scope.startBook = () => {
        $state.go('page', {id: $scope.currentPage._id})
    }


});
