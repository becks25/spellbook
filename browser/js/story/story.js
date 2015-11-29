/**
 * Created by Austin on 10/7/15.
 */
app.config($stateProvider => {
    $stateProvider.state('story', {
        url: '/story',
        views: {
            'main': {
                controller: 'StoryCtrl',
                templateUrl: 'js/story/story.html'
            }
        },
        resolve: {
            stories: (StoryFactory) => StoryFactory.findAll(),
            user: (UserFactory, AuthService) => {
                return AuthService.getLoggedInUser()
                    .then(user => {
                        if(user) return UserFactory.find(user._id);
                        else return;
                    })
            }
        },
        controller: 'StoryCtrl'
    })
});

app.controller('StoryCtrl', ($scope, $state, stories, $timeout, StoryFactory, $stateParams, $rootScope, outTran, user, $uibModal) => {
    $scope.stories = stories;
    $scope.pop = false;
    console.log("the user", user);

    var findIfStarted = (story) => {
        return story.getAllPages(story._id)
            .then(pages => {
                if (user){
                    for(var i =0; i < user.unfinishedPages.length; i++) {
                        if(user.unfinishedPages[i].storyId === story._id) {
                            return user.unfinishedPages[i];
                        }
                    }
                }
                for(var j =0; j < pages.length; j++) {
                    if(pages[j].pageNumber === 0) return pages[j];
                }
            });
    };

    $scope.goToStoryPage = (event, story) => {
        if (!user) {
            var modalInstance = $uibModal.open({
                            animation:true,
                            templateUrl: 'js/common/directives/not-loggedin/not-loggedin.html',
                            controller: 'ModalCtrl'
            });
        }
        findIfStarted(story).then(result => {
            $('.shelf-whole').fadeOut();
            $('.story-info').fadeOut().css('display','none');
            Promise.all(outTran.animate(event.currentTarget))
                .then(() => $state.go('page', {id: result._id}))
        });
        // }
        // else{
        //     modalInstance = $uibModal.open({
        //                     animation:true,
        //                     templateUrl: 'js/common/directives/not-loggedin/not-loggedin.html',
        //                     controller: 'ModalCtrl'
        //                 });
        // }
    };
});
