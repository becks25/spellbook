/**
 * Created by Austin on 10/13/15.
 */
app.factory('outTran', ($timeout) => {
    return {
        animate: (element) => {
            var p1 = new Promise((resolve, reject) => {
                var siblings = $(element).siblings();
                siblings.each((index, elem) => {
                    $timeout(() => {
                        elem.classList.add('animated', 'fadeOutDown', 'fadeInUp');
                    }, Math.random() * 450)
                });
            });
            return p1;
        }
    }
});
