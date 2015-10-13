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
                    },
                    page: ($stateParams, helper, story, user) => {
                        return story.getAllPages($stateParams.storyId)
                            .then(pages => {
                                return pages;
                            })
                            .then(pages => {
                                //return function() {
                                var current = helper.intersectingPages(pages, user.unfinishedPages);
                                if (Object.keys(current).length > 0) {
                                    return current;
                                } else {
                                    var rtnPage;
                                    pages.some(p => {
                                        if (p.pageNumber = 1) {
                                            rtnPage = p;
                                            return p;
                                        }
                                    });
                                    return rtnPage;
                                }
                                //}
                            })
                    }
                },
                templateUrl: 'js/story/indivStory/indivStory.html',
                controller: 'indivStoryCtrl'
            }
        }

    });
});

app.controller('indivStoryCtrl', ($scope, $state, $stateParams, StoryFactory, story, $timeout, user, page) => {
    $scope.startBook = () => {
        $state.go('page', {id: page._id})
    };

    $scope.startBook();

});
