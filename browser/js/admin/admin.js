app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        views: {
            main: {
                templateUrl: 'js/admin/admin.html',
                controller: 'AdminController'
            }
        },
        resolve: {
            stories: (StoryFactory) => StoryFactory.findAll(),
            users: (UserFactory) => UserFactory.findAll(),
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
            }
        }
    });

});

app.controller('AdminController', function ($scope, stories, users, mastery, popularStory) {
    $scope.stories = stories;
    $scope.users = users;
    $scope.averageMastery = mastery[0];
    $scope.averageRating = mastery[1];
    $scope.storyPopularity = popularStory;
    $scope.authors = _.uniq($scope.stories, 'author');

    $scope.mostPopular = _.max($scope.storyPopularity, (story) => story[1]);


    $scope.findPercentage = (part, total) => {
        return Math.floor(part/total * 100) + '%'
    }

});