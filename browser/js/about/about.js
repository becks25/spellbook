app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        views: {
            main: {
                templateUrl: 'js/about/about.html',
                controller: 'AboutController'
            }
        }
    });

});

app.controller('AboutController', function ($scope, FullstackPics) {

    // Images of beautiful Fullstack people.
    $scope.images = _.shuffle(FullstackPics);

});