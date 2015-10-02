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
            getNext: () => {
                return $http.get(`/api/pages?story=${this.story._id}&pageNumber=${this.pageNumber+1}`)
            }
        }
    });
}).run(PageFactory=>{});