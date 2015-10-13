/**
 * Created by Austin on 10/12/15.
 */
app.directive('reload', ($timeout, $rootScope) => {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            $rootScope.$on('$stateChangeSuccess', (ev, to, toParams, from, fromParams) => {
                if (to.name === 'story') {
                    var children = element.children();
                    children.each((index, elem) => {
                       for(let key in elem.classList) {
                           if (elem.classList[key] === 'fadeOutDown') {
                               $timeout(() => {
                                   elem.classList.remove('fadeOutDown');
                               }, Math.random()*450);
                           }
                       }
                    })
                }
            });
        }
    }
});
