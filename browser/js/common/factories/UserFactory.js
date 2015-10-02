app.factory('UserFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'users',
        idAttribute: '_id',
        relations: {
            hasMany: {
                stories: {
                    localKey: 'storyId',
                    localField: 'completedStories'
                }
            },
            hasMany: {
                pages: {
                    localKey: 'pageId',
                    localField: 'unfinishedPages'
                }
            }
        }
    });
}).run(UserFactory=>{});