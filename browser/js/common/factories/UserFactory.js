app.factory('UserFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'users',
        idAttribute: '_id',
        relations: {
            hasMany: {
                stories: {
                    localKey: 'completedStories',
                    localField: '_completedStories'
                },
                pages: {
                    localKey: 'unfinishedPages',
                    localField: '_unfinishedPages'
                }
            }
        },
        methods: {
            getScore: (concept) => {
                var score = 0;
                this.mastery.some(conceptObj=>{
                    if(conceptObj.topic === concept) {
                        score = Math.floor(conceptObj.pointsEarned/conceptObj.pointsPossible*100);
                        return true;
                    }
                    return score;
                });
            }
        }
    });
}).run(function(UserFactory) {});