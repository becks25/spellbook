app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        views: {
            main: {
                templateUrl: 'js/home/home.html',
            }
        }
    });
});