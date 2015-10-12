app.factory('LevelFactory', function(PageFactory, UserFactory, AuthService, MapFactory){
  class Level {
    constructor(page){
      this.page = page;
      // console.log('page requirements?', this.page.requirements)
      this.map = new MapFactory(page.gameboard);
      this.requirements = this.page.requirements;
      this.hint = page.hint;
      this.concepts = page.concepts;
      this.points = 50;

      //the background for the challenge, not the story
      this.background = page.image;
    }

    resetMap(){
      this.map.resetMap();
    }

    // requirements is structured as:
    // { requirementA: {
    //    actionA: {val:false},
    //    actionB: {val:false}
    //}}
    resetRequirements(){
      for(var req in this.requirements){
        for (var action in req){
          for (var val in action){
            val = false;
          }
        }
      }
    }

    isSolved(){
    //loop through requirements and verify they are true
    // console.log(this.requirements)
    for (var req in this.requirements){
      // console.log('req', req)
      for (var action in this.requirements[req]){
        for (var val in this.requirements[req][action]){
          // console.log('val', this.requirements[req][action][val])
          if (this.requirements[req][action][val] === false) return false;
        }
      }
    }
    return true;
  }

    //check and update requirements
    updateReq(variable, action, val){
      // console.log('updating', variable, action, val)
        if (_.has(this.requirements, variable, action, val)){
          // console.log('updating from', this.requirements[variable][action][val])
           this.requirements[variable][action][val] = true;
        }

    }

    win(){
      console.log('yay you won!')
      // var nextPage = PageFactory.methods.getNext(this.page);


      //get the currently logged in user
      AuthService.getLoggedInUser()
        .then(user => {
          if(!user) return;
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
            });
        });


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