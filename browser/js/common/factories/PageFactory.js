app.factory('PageFactory', function(DS, $http) {
    return DS.defineResource({
        name: 'pages',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                stories: {
                    localKey: 'storyId',
                    localField: 'story'
                }
            },
            
        }
    });
});