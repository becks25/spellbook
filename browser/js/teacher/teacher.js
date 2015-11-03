app.config(function ($stateProvider) {
    $stateProvider.state('teacher', {
        url: '/teacher',
        data: {
            authenticate: true
        },
        views: {
            'main': {
                controller: 'TeacherCtrl',
                templateUrl: 'js/teacher/teacher.html'
            }
        },
        resolve: {
            classes: (ClassesFactory, AuthService) => {

                return AuthService.getLoggedInUser()
                    .then(user => {
                        return ClassesFactory.find({teacher: user._id});

                    })
            }
        }
    });
});


app.controller('TeacherCtrl', function ($scope, AuthService, UserFactory, $state, classes, StoryFactory, $window) {
    console.log('classes', classes);
});