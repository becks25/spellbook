app.factory('LevelFactory', function(PageFactory, UserFactory, AuthService){
  class Level {
    constructor(page){
      this.page = page;
      this.map = page.gameboard;
      this.win = page.requirements;
      this.hint = page.hint;
      this.concepts = page.concepts;
      this.points = 50;

      //the background for the challenge, not the story
      this.background = page.image;
    }

    win(){
      var nextPage = PageFactory.getNext();

      //get the currently logged in user
      AuthService.getLoggedInUser
        .then(user => {
          UserFactory.find(user.id)
            .then(userInfo => {
              //remove the current page from their unfinishedPages
              var i = userInfo.unfinishedPages.indexOf(this.page);
              userInfo.unfinishedPages.splice(i, 1);

              //add the next page to their unfinished Pages
              userInfo.unfinishedPages.push(nextPage);

              //update mastery
              userInfo.mastery.forEach(concept =>{
                if(this.concepts.indexOf(concept.topic) !== -1){
                  concept.pointsEarned += this.points;
                  concept.pointsPossible += 50;
                }
              });

              //save it.
               UserFactory.save(user.id);
            })
        })


        //TODO: make the arrow visible? what is this even?

    }

    lose(){
      if(this.points > 10){
        this.points = this.points-5;
      }
    }


  }

  return Level;


});