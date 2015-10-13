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

                var nextPage = page.pageNumber++
                console.log(nextPage);
                DS.findAll({
                    where: { pageNumber:
                        {"==" : nextPage }
                }
            }).then(function(pages){
                console.log(pages)
            });
            },
            logOut: () => {
                console.log("hello world")
            }
        }
    });
}).run(PageFactory=>{});
