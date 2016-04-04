app.config(['$stateProvider', function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        views: {
            main: {
                templateUrl: 'js/about/about.html'
            }
        }
    });

}]);
