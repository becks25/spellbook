app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        data: {
          adminOnly: true,
          authenticate: true
        },
        views: {
            main: {
                templateUrl: 'js/admin/admin.html',
                controller: 'AdminController'
            }
        },
        resolve: {
            stories: (StoryFactory) => StoryFactory.findAll(),
            users: (UserFactory) => {
                return UserFactory.findAll()
                    .then(users => {
                        users.forEach(user => {
                            var earned = 0;
                            var total = 0;

                            user.mastery.forEach(concept => {
                                earned += concept.pointsEarned;
                                total += concept.pointsPossible;
                            });

                            if(earned === 0 || total === 0) user.averageScore = 0;
                            else user.averageScore = Math.floor(earned/total * 100);

                        });

                        return users; 
                    })
            },
            mastery: (users) => {
                var averageMastery = {};
                var averageRating = [0,0];
                users.forEach(user => {
                    user.mastery.forEach(concept=>{
                        if(!averageMastery[concept.topic]) averageMastery[concept.topic] = [0, 0];
                        averageMastery[concept.topic][0] += concept.pointsEarned;
                        averageRating[0] += concept.pointsEarned;
                        averageMastery[concept.topic][1] += concept.pointsPossible;
                        averageRating[1] += concept.pointsPossible;
                    });
                });

                return [averageMastery, averageRating];
            },
            popularStory: (users) => {
                var storyPopularity= {};

                users.forEach(user => {
                    user.completedStories.forEach(story =>{
                        if(!storyPopularity[story._id]) storyPopularity[story._id] = [story.title, 0];
                        storyPopularity[story._id][1]++;
                    });
                });


                return storyPopularity;
            },
            usersData: (users) => {
                var genderDist = _.countBy(users, 'gender');
                var ageDist = _.countBy(users, 'age');

                return [genderDist, ageDist];
            }
        }
    });

});

app.controller('AdminController', function ($scope, stories, users, mastery, popularStory, CONCEPTS, usersData) {
    $scope.stories = stories;
    $scope.users = users;
    $scope.averageMastery = mastery[0];
    $scope.averageRating = mastery[1];
    $scope.storyPopularity = popularStory;
    $scope.authors = _.uniq($scope.stories, 'author');

    $scope.mostPopular = _.max($scope.storyPopularity, (story) => story[1]);

    $scope.searchUsers = '';
    $scope.score= {
        min: 0,
        max: 100
    };

    $scope.genderDist = usersData[0];
    $scope.ageDist = usersData[1];
    $scope.searchTitle;
    $scope.searchAuthor;

    $scope.concepts = CONCEPTS;

    $scope.clickedConcepts = {};

    $scope.toggleConcept = (concept, e) => {
        e.stopPropagation()
        $scope.clickedConcepts[concept] = !$scope.clickedConcepts[concept];
    }

    $scope.concepts.forEach(concept => $scope.clickedConcepts[concept] = true);

    $scope.findPercentage = (part, total) => {
        if(part === 0 || total === 0) return '0%';
        return Math.floor(part/total * 100) + '%'
    }



});

app.filter('rangeFilter', function() {
    return function( users, rangeInfo ) {
        var filtered = [];
        var min = parseInt(rangeInfo.min);
        var max = parseInt(rangeInfo.max);

        if(isNaN(min)) min = 0;
        if(isNaN(max)) max = 100;

        users.forEach(user => {
            if( user.averageScore >= min && user.averageScore <= max ) {
                filtered.push(user);
            }
        });

        return filtered;
    };
});

app.filter('inArray', function(){
    return function(stories, clickedConcepts){
        var filtered = [];

        stories.forEach(story => {
            story.concepts.forEach(concept => {
                if(clickedConcepts[concept]) filtered.push(story);
            })
        })
        

        return filtered;
    };
});