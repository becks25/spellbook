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
            }
        },
        methods: {
            getNext: (page) => {
                return $http.get(`/api/pages?story=${page.storyId}&pageNumber=${page.pageNumber+1}`)
                            .then(response => response.data);
            }
        }
    });
}).run(PageFactory=>{});