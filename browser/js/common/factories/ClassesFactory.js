app.factory('ClassesFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'classes',
        idAttribute: '_id',
        relations: {
            // hasMany: {
            //     students: {
            //         localKeys: '_students',
            //         localField: 'students'
            //     },
            //     assignedStories: {
            //         localKeys: '_assignedStories',
            //         localField: 'assignedStories'
            //     }
            // },
            belongsTo: {
                teacher: {
                    localKey: 'teacherId',
                    localField: 'teacher'
                }
            }
            
        }
    })
}).run(ClassesFactory=>{});
