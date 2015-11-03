
app.config($stateProvider => {
    $stateProvider.state('teacher', {
        url: '/teacher',
        views: {
            'main': {
                controller: 'TeacherCtrl',
                templateUrl: 'js/teacher/teacher.html'
            }
        },
        resolve: {
            user: (AuthService) => {
                return AuthService.getLoggedInUser();
            },
            classes: (ClassesFactory, AuthService) => {

                return ClassesFactory.findAll();
                // return AuthService.getLoggedInUser()
                //     .then(user => {
                //         return ClassesFactory.findAll();
                //             // .then(allClasses => {
                //             //     console.log('here', allClasses);
                //             //     return allClasses.filter(_class => {
                //             //         return _class.teacher == user;
                //             //     })
                //             // })

                //     })
            }
        },
        controller: 'TeacherCtrl'
    })
});


app.controller('TeacherCtrl', function ($scope, AuthService, UserFactory, ClassesFactory, $state, classes, user) {
    $scope.classes = classes;
    $scope.createNewClass = {
        teacher: user
    };

    $scope.createClass = (createNewClass) => {
        console.log('here', createNewClass);

         ClassesFactory.create(createNewClass)
            .then(function(createdClass) {
                $scope.classes.push(createdClass);
                console.log('success', $scope.classes);
              });

    }

});