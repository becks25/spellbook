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
                console.log("hit it")
                // return $http.get(`/api/pages?story=${page.storyId}&pageNumber=${page.pageNumber+1}`)
                //             .then(response => response.data);
                var nextPage = page.pageNumber++
                console.log(nextPage);
                DS.findAll({
                    where: { pageNumber: 
                        {"==" : nextPage }
                }
            }).then(function(pages){
                console.log(pages)
            })
                //console.log("the nextpage", turnPage);
                // .then(function(response){
                //     console.log("this is the response", response)
                //     return response.data;
                // })

            },
            logOut: () => {
                console.log("hello world")
            }
        }
    });
}).run(PageFactory=>{});