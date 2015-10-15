/**
 * Created by Austin on 10/2/15.
 */
//jsData
app.factory('StoryFactory', (DS, $http, $state, PageFactory) => {
    return DS.defineResource({
        name: 'stories',
        idAttribute: '_id',
        relations: {
            belongsTo: {
                users: {
                    localKey: 'userId',
                    localField: 'author'
                }
            }
        },
        methods: {
            goToPage: (pageNum) => {
                PageFactory.find({story: this._id, pageNumber: pageNum})
                .then((page)=>{
                    $state.go('page', {id:page._id});
                });
            },
            goToStory: (storyId) => {
                $state.go('story.indivStory', {storyId: storyId});
            },
            sayMyName: () => {
                return this;
            },
            getAllPages: (storyId) => {
                return $http.get(`api/pages/story/${storyId}`)
                    .then(response => response.data)
            }
        }
    })
}).run( StoryFactory => {});
