/**
 * Created by Austin on 10/12/15.
 */
app.directive('sibs', function ($timeout) {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {
            element.bind('click', () => {
                var children = element.parent().children();
                return new Promise((resolve, reject) => {
                    children.each((index, elem) => {
                        if (element['context'].$$hashKey !== elem.$$hashKey) {
                            $timeout(() => {
                                elem.classList.add('animated', 'fadeOutDown', 'fadeInUp');
                            }, Math.random() * 450)

                        }
                    });
                }).then( () => {
                        StoryCtrl
                    })
            })
        }
    }
});
