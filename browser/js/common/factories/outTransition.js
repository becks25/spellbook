/**
 * Created by Austin on 10/13/15.
 */
app.factory('outTran', ($timeout) => {
    return {
        animate: (element) => {
            var promises = [];
            var siblings = $(element).siblings();
            siblings.each((index, elem) => {
                promises.push($timeout(() => {
                    elem.classList.add('animated', 'fadeOutDown', 'fadeInUp');
                }, Math.random() * 450))
            });
            promises.push($timeout(()=>{}, 800));
            return promises;

        }
    }
});
