app.factory('ClassesFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'classes',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                teacher: {
                    localKey: 'teacherId',
                    localField: 'teacher'
                }
            },
            hasMany: {
                students: {
                    localKey: '_students',
                    localField: 'students'
                },
                assignedStories: {
                    localKey: '_assignedStories',
                    localField: 'assignedStories'
                }
            }
        }
    });
}).run(ClassesFactory=>{});
