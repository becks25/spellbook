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
                var nextPage = page.pageNumber++;
                DS.findAll({
                    where: { pageNumber:
                        {"==" : nextPage }
                }
            })
            },
            logOut: () => {
                console.log("hello world")
            }
        }
    });
}).run(PageFactory=>{});
