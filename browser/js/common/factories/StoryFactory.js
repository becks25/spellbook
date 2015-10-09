/**
 * Created by Austin on 10/2/15.
 */
//jsData
app.factory('StoryFactory', (DS, $http, $state, PageFactory) => {
    return DS.defineResource({
        name: 'stories',
        idAttribute: '_id',
        relations: {
            hasOne: {
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
                $state.go('indivStory', {storyId: storyId});
            },
            sayMyName: () => {
                return this;
            }
        }
    })
}).run( StoryFactory => {});
